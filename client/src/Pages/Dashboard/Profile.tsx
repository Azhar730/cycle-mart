// import { logout, selectCurrentUser } from "@/Redux/features/auth/authSlice";
// import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// const Profile = () => {
//   const navigate = useNavigate()
//   const currentUser = useAppSelector(selectCurrentUser);
//   const dispatch = useAppDispatch();
//   const handleLogout = () => {
//     dispatch(logout());
//     localStorage.removeItem("token");
//     navigate('/login')
//     toast.success("Logout successful");
//   };
//   return (
//     <div className="max-w-[100%] mx-auto w-80">
//       <div className="rounded-lg border-2 border-primary bg-transparent px-4 py-8 text-center shadow-lg">
//         <figure className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="48"
//             height="48"
//             fill="currentColor"
//             className="bi bi-person-fill text-white dark:text-rose-300"
//             viewBox="0 0 16 16"
//           >
//             <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
//           </svg>
//           <figcaption className="sr-only">{currentUser?.name}</figcaption>
//         </figure>
//         <h2 className="mt-4 text-xl font-bold text-primary dark:text-rose-400">
//           {currentUser?.name}
//         </h2>
//         <p className="mb-4 text-gray-600">
//           Role:{" "}
//           <span className="font-bold text-primary">
//             {currentUser?.role.toUpperCase()}
//           </span>
//         </p>
//         <div className="flex items-center justify-center">
//           <button
//             onClick={handleLogout}
//             className="rounded-full cursor-pointer bg-primary px-4 py-2 text-white"
//           >
//             Log Out
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import { logout, selectCurrentUser } from "@/Redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Swal from "sweetalert2";

const Profile = () => {
  const navigate = useNavigate();
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        localStorage.removeItem("accessToken");
        navigate("/login");
        toast.success("Logged out successfully");
        Swal.fire("Successful!", "You have been logged out.", "success");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-10"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mx-auto mb-6 h-32 w-32 rounded-full bg-primary flex items-center justify-center shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              fill="white"
              className="bi bi-person-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
          </motion.div>
          <h2 className="text-3xl font-extrabold text-primary dark:text-rose-400">
            {currentUser?.name || "Unknown User"}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
            {currentUser?.email || "no-email@example.com"}
          </p>
          <p className="mt-2 text-lg font-medium text-primary dark:text-rose-300">
            Role: <span className="uppercase">{currentUser?.role}</span>
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full shadow-md transition"
          >
            Log Out
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
