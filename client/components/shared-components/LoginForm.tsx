import { yupResolver } from '@hookform/resolvers/yup';
import { useAtom } from 'jotai';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { logInUser } from '../../lib/api/user.api';
import { userAtom } from '../../lib/atoms/user.atom';
import { setAuthToken } from '../../util/token-storage';
import { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { toast } from 'react-toastify';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import ValidationError from './form-components/ValidationError';

const LoginForm = () => {
  const [user, setUser] = useAtom(userAtom);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const schema = yup.object().shape({
    email: yup.string().required('email is required.'),
    password: yup.string().required('Password is required.'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    shouldFocusError: false,
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginHandler = async (formData: { email: string; password: string }): Promise<void> => {
    setLoading(true);
    try {
      const resData = await logInUser(formData.email, formData.password);
      setUser(resData);
      setAuthToken(resData.token);
    } catch (e) {
      toast('Log in failed', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 pt-0">
      <div className="md:w-1/2 bg-white   p-5 border-t border-t-blue-500  rounded-b-lg shadow-lg">
        <h1 className="text-center font-serif text-3xl text-slate-600 pt-3 pb-5">Welcome Back</h1>
        <form className="" onSubmit={handleSubmit(loginHandler)}>
          <div className="flex flex-col py-3 items-center">
            <div className="lg:w-1/2">
              <label htmlFor="email" className="mb-2">
                <MdOutlineAlternateEmail className="text-blue-500 inline-block mb-1 mr-1" />
                <span className="text-sm">email</span>
              </label>
              <input
                id="email"
                type="text"
                className="bg-slate-50 rounded border border-gray-100 text-gray-900 text-sm  focus:outline-none  focus:border-gray-300 w-full p-2"
                disabled={loading}
                {...register('email')}
              />
              {errors.email ? (
                <div className="mt-1">
                  <ValidationError message={errors.email.message} />
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col py-3 items-center">
            <div className="lg:w-1/2">
              <label htmlFor="password" className="mb-2">
                <RiLockPasswordLine className="text-blue-500 inline-block mb-1 mr-1" />
                <span className="text-sm">password</span>
              </label>
              <input
                id="password"
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                className="bg-slate-50 rounded border border-gray-100 text-gray-900 text-sm  focus:outline-none  focus:border-gray-300 w-full p-2"
                disabled={loading}
              />
              {errors.password ? (
                <div className="mt-1">
                  <ValidationError message={errors.password.message} />
                </div>
              ) : null}
            </div>
          </div>
          <div className=" flex justify-center py-3">
            {showPassword ? (
              <FaEye onClick={() => setShowPassword(!showPassword)} className="text-blue-500 hover:cursor-pointer" />
            ) : (
              <FaEyeSlash onClick={() => setShowPassword(!showPassword)} className="hover:cursor-pointer" />
            )}
          </div>
          <div className="flex justify-center my-9">
            <button
              type="submit"
              className="disabled:border-gray-300 disabled:text-gray-500 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded px-8 py-1 border border-blue-500 bg-transparent text-blue-600 hover:bg-blue-500 hover:text-white hover:border-blue-500"
              disabled={loading}
            >
              {loading ? <LoadingSpinner /> : 'Log in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
