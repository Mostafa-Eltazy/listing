import { Category } from '../../lib/interfaces/category.interface';
import { Listing } from '../../lib/interfaces/listing.interface';
import { computeCreatedAt } from '../../util/utilities';
import ItemsImageDisplayer from './ItemsImageDisplayer';

interface Props {
  listing: Listing;
  categories: Category[];
}

const ListingVerticalCard = ({ listing, categories }: Props) => {
  return (
    <div className="border p-3 my-5 rounded hover:shadow-lg">
      <ItemsImageDisplayer picturesUrls={listing.images} />
      <h3 className="mb-2 text-2xl font-serif text-slate-600 text-center md:text-left px-2 ">
        {' '}
        <a className="hover:underline" href={`/listing/${listing.id}`}>
          {listing.title}
        </a>{' '}
      </h3>
      <p className="text-sm text-slate-400">Posted {computeCreatedAt(listing.createdAt)}</p>
    </div>
  );
};

export default ListingVerticalCard;
