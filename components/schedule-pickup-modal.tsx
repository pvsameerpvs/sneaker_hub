"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { X } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";

type FormData = {
  name: string;
  phone: string;
  date: string;
  time: string;
  address: string;
  description?: string;
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
  } = useForm<FormData>();

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submissionData, setSubmissionData] = useState<FormData | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isSending, setIsSending] = useState(false); // Loading state
  const [sendError, setSendError] = useState<string | null>(null); // Error state

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setSubmissionData(data);
    setShowConfirmation(true);
  };

  const handleConfirmSubmission = async () => {
    if (!submissionData) return;

    setIsSending(true);
    setSendError(null);

    try {
      // Prepare email parameters
      const templateParams = {
        name: submissionData.name,
        phone: submissionData.phone,
        date: submissionData.date,
        time: submissionData.time,
        address: submissionData.address,
        description: submissionData.description || "No additional description",
      };

      // Send email using EmailJS
      await emailjs.send(
        "service_f4h2bw3", // Service ID
        "template_lrgg2ta", // Template ID
        templateParams,
        "T81vTM6eDLaKfZXmZ" // Public Key
      );

      // Success handling
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
        <p className="mb-6 text-xs text-zinc-600 dark:text-zinc-400">
          Please select a date and time for your sneaker pickup
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-1">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="mb-1 block text-xs font-medium">
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
                <p className="form-error mt-1 text-xs text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="mb-1 block text-xs font-medium">
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
                <p className="form-error mt-1 text-xs text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Date & Time Fields */}
            <div className="flex flex-col gap-1 sm:flex-row">
              <div className="flex-1">
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
                  <p className="form-error mt-1 text-xs text-red-500">
                    {errors.date.message}
                  </p>
                )}
              </div>

              <div className="flex-1">
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
                  <p className="form-error mt-1 text-xs text-red-500">
                    {errors.time.message}
                  </p>
                )}
              </div>
            </div>

            {/* Address Field */}
            <div>
              <label
                htmlFor="address"
                className="mb-1 block text-xs font-medium"
              >
                Address
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
                <p className="form-error mt-1 text-xs text-red-500">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Description Field */}
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

          <div className="mt-8 flex justify-end gap-2">
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
              className={`bg-zinc-900 px-7 py-2 text-sm font-bold text-white dark:bg-white dark:text-black`}
            >
              Confirm Pickup
            </Button>
          </div>
        </form>
      </div>

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

      {/* NEW: Success message modal */}
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
  );
}
