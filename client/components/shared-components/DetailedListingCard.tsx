import { Category } from '../../lib/interfaces/category.interface';
import { Listing } from '../../lib/interfaces/listing.interface';
import { computeCreatedAt, determineCategoryName, formatPrice } from '../../util/utilities';
import Badge from './Badge';
import ItemsImageDisplayer from './ItemsImageDisplayer';

interface Props {
  listing: Listing;
  categories: Category[];
}

const ListingVerticalCard = ({ listing, categories }: Props) => {
  let categoryName = '';
  if (listing?.categoryId) {
    categoryName = determineCategoryName(parseInt(listing?.categoryId), categories);
  }

  return (
    <div className="p-3 my-5">
      <ItemsImageDisplayer picturesUrls={listing?.images} />
      <h3 className="mb-2 text-2xl font-serif text-slate-600 text-center md:text-left px-2 ">{listing?.title}</h3>
      <p className="text-sm text-slate-400">Posted {computeCreatedAt(listing?.createdAt)}</p>
      <div className="flex flex-col-reverse items-center md:grid grid-cols-3">
        <div className="col-1 p-2 md:flex flex-col items-start">
          <p>
            Starting Price: <b>{formatPrice(listing?.startPrice)}</b>
          </p>
          <p>Maximum Price : {formatPrice(listing?.maxPrice)}</p>
        </div>
        <div className="col-start-3 p-2 w-full flex md:flex-col flex-wrap justify-around items-center md:items-end">
          <div className="flex mb-2">
            <Badge text={categoryName} color="bg-green-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingVerticalCard;
