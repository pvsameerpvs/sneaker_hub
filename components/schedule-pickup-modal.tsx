"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import emailjs from "@emailjs/browser";
import type { LatLngExpression } from "leaflet";
import { Crosshair, X } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  useMapEvents,
  type MapContainerProps,
  type MarkerProps,
  type TileLayerProps,
} from "react-leaflet";

import { Button } from "@/components/ui/button";

// import { fixLeafletIcons } from "@/lib/leaflet-fix"; // ← if you created the marker icon fix

// Typed dynamic imports (ssr:false avoids Next SSR issues)
const MapContainer = dynamic<MapContainerProps>(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic<TileLayerProps>(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);
const Marker = dynamic<MarkerProps>(
  () => import("react-leaflet").then((m) => m.Marker),
  { ssr: false }
);

type FormData = {
  name: string;
  phone: string;
  date: string;
  time: string;

  // Core address
  address: string;
  // NEW: granular address details
  street?: string;
  building?: string;
  flat?: string;
  landmark?: string;

  description?: string;

  // Location fields
  lat?: number;
  lng?: number;
  mapsLink?: string;
};

export default function SchedulePickupModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormData>();

  // UI state
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submissionData, setSubmissionData] = useState<FormData | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  // Location state
  const [locLoading, setLocLoading] = useState(false);
  const [locError, setLocError] = useState<string | null>(null);
  const lat = watch("lat");
  const lng = watch("lng");

  // Default center = Dubai (fallback)
  const defaultCenter: LatLngExpression = [25.2048, 55.2708];
  const center: LatLngExpression = useMemo(() => {
    if (typeof lat === "number" && typeof lng === "number") return [lat, lng];
    return defaultCenter;
  }, [lat, lng]);

  // useEffect(() => { fixLeafletIcons(); }, []); // ← if using the icon helper

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setSubmissionData({
      ...data,
      mapsLink:
        data.mapsLink ??
        (data.lat && data.lng
          ? `https://maps.google.com/?q=${data.lat},${data.lng}`
          : undefined),
    });
    setShowConfirmation(true);
  };

  const handleConfirmSubmission = async () => {
    if (!submissionData) return;
    setIsSending(true);
    setSendError(null);

    try {
      const templateParams = {
        name: submissionData.name,
        phone: submissionData.phone,
        date: submissionData.date,
        time: submissionData.time,

        // Core + granular address
        address: submissionData.address || "—",
        street: submissionData.street || "—",
        building: submissionData.building || "—",
        flat: submissionData.flat || "—",
        landmark: submissionData.landmark || "—",

        description: submissionData.description || "No additional description",
        lat: submissionData.lat?.toString() ?? "—",
        lng: submissionData.lng?.toString() ?? "—",
        maps_link:
          submissionData.mapsLink ??
          (submissionData.lat && submissionData.lng
            ? `https://maps.google.com/?q=${submissionData.lat},${submissionData.lng}`
            : "—"),
      };

      await emailjs.send(
        "service_f4h2bw3",
        "template_lrgg2ta", // make sure this template includes the new fields
        templateParams,
        "T81vTM6eDLaKfZXmZ"
      );

      setShowConfirmation(false);
      setShowSuccessMessage(true);
    } catch (error) {
      console.error("Email sending failed:", error);
      setSendError("Failed to schedule pickup. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessMessage(false);
    reset();
    setSubmissionData(null);
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  // Browser geolocation → set fields + reverse geocode
  const fetchAndSetAddress = async (la: number, lo: number) => {
    setValue("lat", la);
    setValue("lng", lo);
    setValue("mapsLink", `https://maps.google.com/?q=${la},${lo}`);
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${la}&lon=${lo}`;
      const res = await fetch(url, { headers: { "Accept-Language": "en" } });
      if (res.ok) {
        const data = await res.json();
        const addr = data?.display_name || `${la.toFixed(6)}, ${lo.toFixed(6)}`;
        setValue("address", addr, { shouldValidate: true });

        // If you want to attempt auto-fill granular fields (best-effort):
        const a = data?.address || {};
        if (a.road) setValue("street", a.road);
        if (a.building) setValue("building", a.building);
        if (a.house_number && !a.building) setValue("building", a.house_number);
        if (a.suburb && !a.landmark) setValue("landmark", a.suburb);
      }
    } catch {
      /* ignore */
    }
  };

  const handleUseMyLocation = () => {
    if (!("geolocation" in navigator)) {
      setLocError("Geolocation is not supported on this device/browser.");
      return;
    }
    setLocLoading(true);
    setLocError(null);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        await fetchAndSetAddress(latitude, longitude);
        setLocLoading(false);
      },
      (err) => {
        setLocLoading(false);
        if (err.code === err.PERMISSION_DENIED) {
          setLocError(
            "Location permission denied. You can enter the address manually."
          );
        } else {
          setLocError("Unable to get your location. Try again.");
        }
      },
      { enableHighAccuracy: true, timeout: 15000 }
    );
  };

  // Map click handler component
  function MapEvents() {
    useMapEvents({
      click: async (e) => {
        const la = e.latlng.lat;
        const lo = e.latlng.lng;
        await fetchAndSetAddress(la, lo);
      },
    });
    return null;
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-zinc-200 bg-white px-6 py-3 dark:border-zinc-800 dark:bg-zinc-900">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 rounded-full p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          aria-label="Close modal"
        >
          <X className="h-5 w-5 text-zinc-500" />
        </button>

        <h3 className="mb-2 text-sm font-bold">Schedule Pickup</h3>
        <p className="mb-3 text-xs text-zinc-600 dark:text-zinc-400">
          Please select a date and time for your sneaker pickup
        </p>

        {/* Location quick actions */}
        <div className="mb-2 flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            className="text-xs"
            onClick={handleUseMyLocation}
            disabled={locLoading}
          >
            {locLoading ? "Locating…" : "Use my current location"}
          </Button>
          {locError && (
            <span className="text-[11px] text-red-500">{locError}</span>
          )}
        </div>

        {/* Map with floating "locate" button */}
        <div className="mb-4 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
          <div className="relative h-56 w-full">
            <MapContainer
              center={center}
              zoom={14}
              scrollWheelZoom
              className="h-full w-full"
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {typeof lat === "number" && typeof lng === "number" && (
                <Marker
                  position={[lat, lng]}
                  draggable
                  eventHandlers={{
                    dragend: async (e: any) => {
                      const { lat: la, lng: lo } = e.target.getLatLng();
                      await fetchAndSetAddress(la, lo);
                    },
                  }}
                />
              )}

              <MapEvents />
            </MapContainer>

            {/* Floating locate button on map */}
            <button
              type="button"
              onClick={handleUseMyLocation}
              className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-md bg-white/90 px-2 py-1 text-[11px] shadow hover:bg-white dark:bg-zinc-800/90 dark:hover:bg-zinc-800"
              title="Use my current location"
            >
              <Crosshair className="h-3.5 w-3.5" />
              Locate
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-3">
            {/* Name & Phone */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1 block text-xs font-medium"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  className={`w-full rounded-lg border p-2 text-xs dark:border-zinc-700 dark:bg-zinc-800 ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-1 block text-xs font-medium"
                >
                  Phone Number (UAE)
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="0542941197"
                  className={`w-full rounded-lg border p-2 text-xs dark:border-zinc-700 dark:bg-zinc-800 ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^0\d{9}$/,
                      message:
                        "Please enter a valid 10-digit UAE phone number starting with 0",
                    },
                  })}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="date"
                  className="mb-1 block text-xs font-medium"
                >
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  className={`w-full rounded-lg border p-2 text-xs dark:border-zinc-700 dark:bg-zinc-800 ${
                    errors.date ? "border-red-500" : ""
                  }`}
                  {...register("date", { required: "Date is required" })}
                />
                {errors.date && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.date.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="time"
                  className="mb-1 block text-xs font-medium"
                >
                  Time
                </label>
                <select
                  id="time"
                  className={`w-full rounded-lg border p-2 text-xs dark:border-zinc-700 dark:bg-zinc-800 ${
                    errors.time ? "border-red-500" : ""
                  }`}
                  {...register("time", { required: "Time slot is required" })}
                >
                  <option value="">Select a time</option>
                  <option value="9:00 AM - 11:00 AM">9:00 AM - 11:00 AM</option>
                  <option value="1:00 PM - 3:00 PM">1:00 PM - 3:00 PM</option>
                  <option value="4:00 PM - 6:00 PM">4:00 PM - 6:00 PM</option>
                </select>
                {errors.time && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.time.message}
                  </p>
                )}
              </div>
            </div>

            {/* Address (auto-filled) */}
            <div>
              <label
                htmlFor="address"
                className="mb-1 block text-xs font-medium"
              >
                Address (auto-filled from map/GPS, editable)
              </label>
              <textarea
                id="address"
                placeholder="Your full pickup address"
                rows={2}
                className={`w-full resize-none rounded-lg border p-2 text-xs dark:border-zinc-700 dark:bg-zinc-800 ${
                  errors.address ? "border-red-500" : ""
                }`}
                {...register("address", { required: "Address is required" })}
              />
              {errors.address && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.address.message}
                </p>
              )}
              <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-zinc-500">
                <span>
                  {typeof lat === "number" && typeof lng === "number"
                    ? `Pin: ${lat.toFixed(6)}, ${lng.toFixed(6)}`
                    : "No pin set"}
                </span>
                {lat && lng && (
                  <a
                    href={`https://maps.google.com/?q=${lat},${lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Open in Google Maps
                  </a>
                )}
              </div>
            </div>

            {/* Extra address fields */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="street"
                  className="mb-1 block text-xs font-medium"
                >
                  Street / Road
                </label>
                <input
                  id="street"
                  type="text"
                  placeholder="e.g., Sheikh Zayed Rd"
                  className="w-full rounded-lg border p-2 text-xs dark:border-zinc-700 dark:bg-zinc-800"
                  {...register("street")}
                />
              </div>
              <div>
                <label
                  htmlFor="building"
                  className="mb-1 block text-xs font-medium"
                >
                  Building / Villa
                </label>
                <input
                  id="building"
                  type="text"
                  placeholder="e.g., Al Salam Tower"
                  className="w-full rounded-lg border p-2 text-xs dark:border-zinc-700 dark:bg-zinc-800"
                  {...register("building")}
                />
              </div>
              <div>
                <label
                  htmlFor="flat"
                  className="mb-1 block text-xs font-medium"
                >
                  Flat / Apt / Floor
                </label>
                <input
                  id="flat"
                  type="text"
                  placeholder="e.g., Apt 803"
                  className="w-full rounded-lg border p-2 text-xs dark:border-zinc-700 dark:bg-zinc-800"
                  {...register("flat")}
                />
              </div>
              <div>
                <label
                  htmlFor="landmark"
                  className="mb-1 block text-xs font-medium"
                >
                  Nearby Landmark
                </label>
                <input
                  id="landmark"
                  type="text"
                  placeholder="e.g., Near City Walk"
                  className="w-full rounded-lg border p-2 text-xs dark:border-zinc-700 dark:bg-zinc-800"
                  {...register("landmark")}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-1 block text-xs font-medium"
              >
                Additional Description (optional)
              </label>
              <textarea
                id="description"
                placeholder="Any special instructions or notes"
                rows={3}
                className="w-full resize-none rounded-lg border p-2 text-xs dark:border-zinc-700 dark:bg-zinc-800"
                {...register("description")}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <Button
              variant="outline"
              className="text-xs"
              type="button"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-zinc-900 px-7 py-2 text-sm font-bold text-white dark:bg-white dark:text-black"
            >
              Confirm Pickup
            </Button>
          </div>
        </form>

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <button
                onClick={() => setShowConfirmation(false)}
                className="absolute top-4 right-4 rounded-full p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                aria-label="Close modal"
              >
                <X className="h-5 w-5 text-zinc-500" />
              </button>

              <h3 className="mb-2 text-xs font-bold">Confirm Pickup</h3>
              <p className="mb-6 text-xs text-zinc-600 dark:text-zinc-400">
                Are you sure you want to schedule this pickup?
              </p>

              {submissionData?.lat && submissionData?.lng && (
                <p className="mb-3 text-[11px] text-zinc-500">
                  Location: {submissionData.lat.toFixed(6)},{" "}
                  {submissionData.lng.toFixed(6)} •{" "}
                  <a
                    className="underline"
                    href={`https://maps.google.com/?q=${submissionData.lat},${submissionData.lng}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View on Google Maps
                  </a>
                </p>
              )}

              {sendError && (
                <p className="mb-2 text-xs text-red-500">{sendError}</p>
              )}

              <div className="mt-8 flex justify-end gap-2">
                <Button
                  variant="outline"
                  className="text-xs"
                  onClick={() => setShowConfirmation(false)}
                >
                  No, Go Back
                </Button>
                <Button
                  className="bg-zinc-900 px-7 py-2 text-sm font-bold text-white dark:bg-white dark:text-black"
                  onClick={handleConfirmSubmission}
                  disabled={isSending}
                >
                  {isSending ? "Sending..." : "Yes, Confirm"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {showSuccessMessage && (
          <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <button
                onClick={handleSuccessClose}
                className="absolute top-4 right-4 rounded-full p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                aria-label="Close modal"
              >
                <X className="h-5 w-5 text-zinc-500" />
              </button>

              <h3 className="mb-2 text-xs font-bold">Pickup Scheduled</h3>
              <p className="mb-6 text-xs text-zinc-600 dark:text-zinc-400">
                Our pickup man will contact you soon. Your location and contact
                details are confirmed. Congratulations!
              </p>

              <div className="mt-8 flex justify-end">
                <Button
                  className="bg-zinc-900 px-7 py-2 text-sm font-bold text-white dark:bg-white dark:text-black"
                  onClick={handleSuccessClose}
                >
                  OK
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
