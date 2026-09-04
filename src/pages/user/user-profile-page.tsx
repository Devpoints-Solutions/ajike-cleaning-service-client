import { useState } from "react";
import { BadgeCheck, Check, Pencil, Save, UserRound } from "lucide-react";
import { useUpdateProfileMutation } from "@/features/apis/user-apis";
import { useAuthContext } from "@/features/contexts/auth-context";
import { useToast } from "@/features/hooks/use-toast";
import type { IUser } from "@/lib/types";
import DashboardLayout from "./dashboard-layout";
import { Loader } from "@/components/common/loader";
import { formatError } from "@/helpers/format-error";

type ProfileField = "firstName" | "lastName" | "email" | "phoneNumber" | "role";

type ProfileValues = Pick<
  IUser,
  "firstName" | "lastName" | "email" | "phoneNumber" | "role"
>;

const fields: Array<{
  key: ProfileField;
  label: string;
  type: "text" | "email" | "tel";
}> = [
  { key: "firstName", label: "First name", type: "text" },
  { key: "lastName", label: "Last name", type: "text" },
  { key: "email", label: "Email address", type: "email" },
  { key: "phoneNumber", label: "Phone number", type: "tel" },
];

function getProfileValues(user: IUser): ProfileValues {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role ?? "user",
  };
}

function UserProfilePage() {
  const { currentUser, updateIsAuthenticatedState } = useAuthContext();
  const { toast } = useToast();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [values, setValues] = useState<ProfileValues | null>(
    currentUser ? getProfileValues(currentUser) : null,
  );
  const [editing, setEditing] = useState<
    Partial<Record<ProfileField, boolean>>
  >({});

  const hasChanges =
    currentUser &&
    values &&
    fields.some(
      (field) => values[field.key] !== getProfileValues(currentUser)[field.key],
    );

  const toggleEditing = (field: ProfileField) => {
    setEditing((current) => ({ ...current, [field]: !current[field] }));
  };

  const updateField = (field: ProfileField, value: string) => {
    setValues((current) =>
      current ? { ...current, [field]: value } : current,
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!values || !hasChanges) return;

    try {
      const response = await updateProfile(values).unwrap();
      const updatedUser = response?.data ?? response;

      if (!updatedUser?._id) {
        throw new Error("The profile response was incomplete.");
      }

      updateIsAuthenticatedState(updatedUser);
      setEditing({});
      toast({
        title: "Profile updated",
        description: "Your account details have been saved.",
      });
    } catch (error) {
      toast({
        title: "Unable to update profile",
        description: formatError(error),
        variant: "default",
      });
    }
  };

  if (!currentUser || !values) {
    return (
      <DashboardLayout>
        <div className="admin-panel p-8 text-center text-[#587285]">
          Your profile is not available right now.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <main className="dashboard-wrap">
        <section className="admin-panel overflow-hidden rounded-2xl">
          <div className="border-b border-[#d7ebf5] bg-gradient-to-br from-[#f2fbff] to-white px-6 py-8 sm:px-10">
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <div className="relative">
                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-[#dff3fa] text-[#1687b6] ring-4 ring-white shadow-lg">
                  {currentUser.picture ? (
                    <img
                      src={currentUser.picture}
                      alt={`${currentUser.firstName} ${currentUser.lastName}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserRound size={38} />
                  )}
                </div>
                <BadgeCheck
                  aria-label="Verified profile"
                  className="absolute -bottom-1 -right-1 rounded-full bg-white text-[#1687b6]"
                  size={25}
                  strokeWidth={2.5}
                />
              </div>
              <div>
                <p className="eyebrow">Account settings</p>
                <h2 className="mt-1 text-2xl font-extrabold text-[#122560]">
                  Your profile
                </h2>
                <p className="mt-1 text-sm font-medium text-[#587285]">
                  Keep your contact details current for smoother service.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-10">
            <div className="grid gap-6 md:grid-cols-2">
              {fields.map((field) => (
                <div key={field.key}>
                  <label
                    htmlFor={`profile-${field.key}`}
                    className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#587285]"
                  >
                    {field.label}
                  </label>
                  <input
                    id={`profile-${field.key}`}
                    type={field.type}
                    value={values[field.key] ?? ""}
                    onChange={(event) =>
                      updateField(field.key, event.target.value)
                    }
                    readOnly={!editing[field.key]}
                    className={`h-11 w-full rounded-xl border px-4 text-sm font-semibold text-[#173f5b] outline-none transition ${
                      editing[field.key]
                        ? "border-[#1687b6] bg-white ring-2 ring-[#dff3fa]"
                        : "border-[#d7ebf5] bg-[#f8fbfd]"
                    }`}
                  />
                  {field?.key !== "email" && (
                    <button
                      type="button"
                      onClick={() => toggleEditing(field.key)}
                      className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-[#1687b6] transition hover:text-[#122560]"
                      aria-label={`${editing[field.key] ? "Stop editing" : "Edit"} ${field.label}`}
                    >
                      {editing[field.key] ? (
                        <Check size={13} />
                      ) : (
                        <Pencil size={13} />
                      )}
                      {editing[field.key] ? "Done" : "Edit"}
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end border-t border-[#e5f0f5] pt-6">
              <button
                type="submit"
                disabled={!hasChanges || isLoading}
                className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-[#122560] px-5 text-sm font-bold text-white transition hover:bg-[#1687b6] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isLoading && <Loader />}Update profile
                <Save size={16} />
              </button>
            </div>
          </form>
        </section>
      </main>
    </DashboardLayout>
  );
}

export default UserProfilePage;
