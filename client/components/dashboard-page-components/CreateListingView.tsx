import React from 'react';
import { useCategories } from '../../lib/hooks/categories.hooks';
import CreateListingForm from '../shared-components/CreateListingForm';

const CreateListingView = () => {
  const { data: categoriesData, isLoading: categoriesLoading } = useCategories();

  return (
    <div>
      <h3 className="text-center">Create your new Listing</h3>
      {!categoriesLoading && categoriesData? <CreateListingForm categories={categoriesData} /> : null}
    </div>
  );
};

export default CreateListingView;
