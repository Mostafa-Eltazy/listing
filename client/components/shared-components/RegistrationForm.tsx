import { yupResolver } from '@hookform/resolvers/yup';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { registerUser } from '../../lib/api/user.api';
import { userAtom } from '../../lib/atoms/user.atom';
import { emailValidationObj, passwordValidationObj, userNameValidationObj } from '../../lib/validation/shared-validation';
import { setAuthToken } from '../../util/token-storage';
import { toast } from 'react-toastify';
import LoadingSpinner from './LoadingSpinner';
import BadgeChecker from './BadgeChecker';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { FiUser } from 'react-icons/fi';
import MultiStepForm from './form-components/MultiStepForm';
import ValidationError from './form-components/ValidationError';

const schema = yup.object().shape({
  firstname: yup.string().required('First name is required.').max(20,'Cant\'t exccede 20 cahrechters'),
  lastname: yup.string().required('Last name is required.').max(20,'Cant\'t exccede 20 cahrechters'),
  username: userNameValidationObj,
  email: emailValidationObj,
  password: passwordValidationObj,
});

const childErrorMap = {
  0: ['firstname', 'lastname'],
  1: ['email', 'username'],
  2: ['password'],
};

const RegistrationForm = () => {
  const [user, setUser] = useAtom(userAtom);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    getValues,
  } = useForm({
    shouldFocusError: false,
    resolver: yupResolver(schema),
    defaultValues: {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
    },
  });
  const typedPasssword = watch('password');
  const registerHandler = async (formData: { email: string; password: string; username: string; firstname: string; lastname: string }): Promise<void> => {
    setLoading(true);
    try {
      const resData = await registerUser(formData.email, formData.password, formData.username, formData.firstname, formData.lastname);
      setAuthToken(resData.token);
      setUser(resData);
    } catch (e) {
      toast('Registeration failed', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 pt-0">
      <div className="md:w-1/2 bg-white   p-5 border-t border-t-blue-500  rounded-b-lg shadow-lg">
        <h1 className="text-center font-serif text-3xl text-slate-600 pt-3 pb-5">Welcome Aboard</h1>
        <form className=" " onSubmit={handleSubmit(registerHandler)}>
          <MultiStepForm errorsObj={errors} errorRefrer={childErrorMap}>
            <div>
              <div className="flex flex-col py-3 items-center">
                <div className="lg:w-1/2">
                  <label htmlFor="firstname" className="mb-2">
                    <FiUser className="text-blue-500 inline-block mb-1 mr-1" />
                    <span className="text-sm">First name</span>
                  </label>
                  <input
                    id="firstname"
                    type="text"
                    {...register('firstname')}
                    value={watch('firstname')}
                    disabled={loading}
                    className="bg-slate-50 rounded border border-gray-100 text-gray-900 text-sm  focus:outline-none  focus:border-gray-300 w-full p-2"
                  />
                  {errors.firstname ? (
                    <div className="flex items-start w-full mt-1">
                      <ValidationError message={errors.firstname.message} />{' '}
                    </div>
                  ) : null}

                  <div className="mt-6">
                    <label htmlFor="lastname" className="mb-2">
                      <FiUser className="text-blue-500 inline-block mb-1 mr-1" />
                      <span className="text-sm">Last name</span>
                    </label>
                    <input
                      id="lastname"
                      type="text"
                      {...register('lastname')}
                      value={watch('lastname')}
                      disabled={loading}
                      className="bg-slate-50 rounded border border-gray-100 text-gray-900 text-sm  focus:outline-none  focus:border-gray-300 w-full p-2"
                    />
                    {errors.lastname ? (
                      <div className="flex items-start w-full mt-1">
                        <ValidationError message={errors.lastname.message} />{' '}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-col py-3 items-center">
                <div className="lg:w-1/2">
                  <label htmlFor="username" className="mb-2">
                    <FiUser className="text-blue-500 inline-block mb-1 mr-1" />
                    <span className="text-sm">Username</span>
                  </label>
                  <input
                    id="username"
                    type="text"
                    {...register('username')}
                    value={watch('username')}
                    disabled={loading}
                    className="bg-slate-50 rounded border border-gray-100 text-gray-900 text-sm  focus:outline-none  focus:border-gray-300 w-full p-2"
                  />
                  {errors.username ? (
                    <div className="flex items-start w-full mt-1">
                      <ValidationError message={errors.username.message} />{' '}
                    </div>
                  ) : null}
                  <div className="mt-6">
                    <label htmlFor="email" className="mb-2">
                      <MdOutlineAlternateEmail className="text-blue-500 inline-block mb-1 mr-1" />
                      <span className="text-sm">Email</span>
                    </label>
                    <input
                      id="email"
                      type="text"
                      {...register('email')}
                      value={watch('email')}
                      disabled={loading}
                      className="bg-slate-50 rounded border border-gray-100 text-gray-900 text-sm  focus:outline-none  focus:border-gray-300 w-full p-2"
                    />
                    {errors.email ? (
                      <div className="flex items-start w-full mt-1">
                        {' '}
                        <ValidationError message={errors.email.message} />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-col py-3 items-center">
                <div className="lg:w-1/2">
                  <label htmlFor="password" className="mb-2">
                    <RiLockPasswordLine className="text-blue-500 inline-block mb-1 mr-1" />
                    <span className="text-sm">password</span>
                  </label>
                  <input
                    id="password"
                    {...register('password')}
                    value={watch('password')}
                    type={showPassword ? 'text' : 'password'}
                    disabled={loading}
                    className="bg-slate-50 rounded border border-gray-100 text-gray-900 text-sm  focus:outline-none  focus:border-gray-300 w-full p-2"
                  />
                  {errors.password ? (
                    <div className="flex items-start w-full mt-1">
                      <ValidationError message={errors.password.message} />{' '}
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
              <div className=" flex flex-wrap justify-center py-3">
                <BadgeChecker text="A small letter" condition={/[a-z]/.test(typedPasssword)} />
                <BadgeChecker text="A capital letter" condition={/[A-Z]/.test(typedPasssword)} />
                <BadgeChecker text="A special character" condition={/[\-_\=.#^()+`~'",<.>/[\]{};:|\\@$!%*?&]/.test(typedPasssword)} />
                <BadgeChecker text="A number" condition={/\d/.test(typedPasssword)} />
                <BadgeChecker text="8 character min" condition={typedPasssword.length > 7} />
              </div>
            </div>
          </MultiStepForm>
          <div className="flex justify-center my-9">
            <button
              type="submit"
              className="disabled:border-gray-300 disabled:text-gray-500 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded px-8 py-1 border border-blue-500 bg-transparent text-blue-600 hover:bg-blue-500 hover:text-white hover:border-blue-500"
              disabled={loading}
            >
              {loading ? <LoadingSpinner /> : 'Sign up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
