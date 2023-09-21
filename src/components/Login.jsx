import { useAuth0 } from "@auth0/auth0-react";
const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    !isAuthenticated && (
      <div className="container h-screen flex justify-center items-center  ">
        <button
          className=" bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700  border-4 text-white py-4 px-8 rounded"
          onClick={() => loginWithRedirect()}
        >
          Sign In
        </button>
      </div>
    )
  );
};
export default LoginButton;
