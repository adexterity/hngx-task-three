import { useAuth0 } from "@auth0/auth0-react";
const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <div className=" px-6 w-full flex justify-end mt-4">
        <button
          className=" bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700  border text-white py-1  px-2 rounded text-sm"
          onClick={() => logout()}
        >
          Sign out
        </button>
      </div>
    )
  );
};
export default LogoutButton;
