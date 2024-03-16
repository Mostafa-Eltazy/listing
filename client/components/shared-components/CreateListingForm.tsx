import { yupResolver } from '@hookform/resolvers/yup';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BiCategoryAlt } from 'react-icons/bi';
import { MdAttachMoney, MdOutlineSubtitles } from 'react-icons/md';

import Select from 'react-select';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { createListing } from '../../lib/api/listing.api';
import { userAtom } from '../../lib/atoms/user.atom';
import { Category } from '../../lib/interfaces/category.interface';
import ValidationError from './form-components/ValidationError';
import LoadingSpinner from './LoadingSpinner';

const defaultFormValues = {
  title: '',
  startPrice: 0,
  maxPrice: 0,
  categoryId: '',
  listingsImage: null,
};

interface Props {
  categories: Category[];
}
const CreateListingForm = ({ categories }: Props) => {
  const [user] = useAtom(userAtom);
  const [loading, setLoading] = useState<boolean>(false);

  const schema = yup.object().shape({
    title: yup.string().required('Title is required.'),
    startPrice: yup.number().required('Start price is required.').min(1, 'Start price must be at least 1'),
    maxPrice: yup
      .number()
      .required('Maximum price is required.')
      .min(1, 'Maximum price must be at least 1')
      .when('startPrice', (startPrice, schema) => {
        return schema.test({
          message: 'Maximum price must be greater than the start price',
          test: (maxPrice: number) => maxPrice > startPrice,
        });
      }),
    categoryId: yup.string().required('Category is required.'),
    listingsImage: yup.mixed().required('at least one image is required.'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm({
    shouldFocusError: false,
    resolver: yupResolver(schema),
    defaultValues: defaultFormValues,
  });

  const createListingHandler = async (formData: any): Promise<void> => {
    setLoading(true);
    try {
      await createListing(formData, user?.id?.toString() ?? '');
      toast('Listing Created', { type: 'success' });
    } catch (e) {
      toast('Failed to create listing', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-left justify-center p-2 lg:p-10 pt-0">
      <form className="" onSubmit={handleSubmit(createListingHandler)}>
        <div className="flex flex-col py-3">
          <label htmlFor="title" className="mb-2">
            <MdOutlineSubtitles className="text-blue-500 inline-block mb-1 mr-1" />
            <span className="text-sm">Title</span>
          </label>
          <input
            id="title"
            type="text"
            className="bg-slate-50 rounded border border-gray-100 text-gray-900 text-sm  focus:outline-none  focus:border-gray-300 w-full p-2"
            disabled={loading}
            {...register('title')}
          />
          {errors.title ? (
            <div className="mt-1">
              <ValidationError message={errors.title.message} />
            </div>
          ) : null}
        </div>
        <div className="flex flex-col py-3">
          <label htmlFor="start-price" className="mb-2">
            <MdAttachMoney className="text-blue-500 inline-block mb-1 mr-1" />
            <span className="text-sm">Starting Price</span>
          </label>
          <input
            id="start-price"
            type="number"
            className="bg-slate-50 rounded border border-gray-100 text-gray-900 text-sm  focus:outline-none  focus:border-gray-300 w-full p-2"
            disabled={loading}
            {...register('startPrice')}
          />
          {errors.startPrice ? (
            <div className="mt-1">
              <ValidationError message={errors.startPrice.message} />
            </div>
          ) : null}
        </div>
        <div className="flex flex-col py-3">
          <label htmlFor="max-price" className="mb-2">
            <MdAttachMoney className="text-blue-500 inline-block mb-1 mr-1" />
            <span className="text-sm">Maximum Price</span>
          </label>
          <input
            id="max-price"
            type="number"
            className="bg-slate-50 rounded border border-gray-100 text-gray-900 text-sm  focus:outline-none  focus:border-gray-300 w-full p-2"
            disabled={loading}
            {...register('maxPrice')}
          />
          {errors.maxPrice ? (
            <div className="mt-1">
              <ValidationError message={errors.maxPrice.message} />
            </div>
          ) : null}
        </div>
        <div className="flex flex-col py-3">
          <label htmlFor="categoryId" className="mb-2">
            <BiCategoryAlt className="text-blue-500 inline-block mb-1 mr-1" />
            <span className="text-sm">Category</span>
          </label>
          <Controller
            name={'categoryId'}
            control={control}
            render={({ field: { value, onChange } }) => {
              return (
                <Select
                  options={categories}
                  className="mb-1"
                  isClearable
                  placeholder={'Select your listing category'}
                  onChange={option => {
                    onChange(option?.id ?? '');
                  }}
                  value={categories?.find(option => value === option.id.toString())}
                  noOptionsMessage={() => null}
                  isDisabled={!categories.length}
                  getOptionLabel={option => option.name}
                  getOptionValue={option => option.id.toString()}
                />
              );
            }}
          />
          {errors.categoryId ? (
            <div className="mt-1">
              <ValidationError message={errors.categoryId.message} />
            </div>
          ) : null}
        </div>
        <div className="flex flex-col py-3">
          <label htmlFor="listingsImage" className="mb-2">
            <BiCategoryAlt className="text-blue-500 inline-block mb-1 mr-1" />
            <span className="text-sm">Image(s)</span>
          </label>
          <input
            {...register('listingsImage')}
            id="listingsImage"
            type="file"
            accept="image/*"
            multiple
            className="bg-slate-50 rounded border border-gray-100 text-gray-900 text-sm  focus:outline-none  focus:border-gray-300 w-full p-2"
            disabled={loading}
          />
          {errors.listingsImage ? (
            <div className="mt-1">
              <ValidationError message={errors.listingsImage.message} />
            </div>
          ) : null}
        </div>
        <div className="flex my-9">
          <button
            type="submit"
            className="disabled:border-gray-300 disabled:text-gray-500 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded px-8 py-1 border border-blue-500 bg-transparent text-blue-600 hover:bg-blue-500 hover:text-white hover:border-blue-500"
            disabled={loading}
          >
            {loading ? <LoadingSpinner /> : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateListingForm;
