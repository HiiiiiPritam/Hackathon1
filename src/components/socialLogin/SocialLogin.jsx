import React from 'react';
import { doSocialLogin } from '@/app/actions/authActions';

function SocialLogin() {
  return (
    <div className="">
      <form action={doSocialLogin} className="flex justify-center space-x-4">
      <button
          className="bg-green-700 hover:bg-gradient-to-r  hover:via-green-700 hover:via-yellow-400 hover:to-red-500 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300"
          type="submit"
          name="action"
          value="google"
        >
          Login with Google
        </button>
        <button
          className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300"
          type="submit"
          name="action"
          value="github"
        >
          Login with GitHub
        </button>
      </form>
    </div>
  );
}

export default SocialLogin;
