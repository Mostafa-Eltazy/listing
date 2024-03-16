import { useAtom } from 'jotai';
import { NextPageContext } from 'next';
import { QueryClient } from 'react-query';
import Header from '../../components/header-components/Header';
import ListingLayout from '../../components/listing-page/ListingLayout';
import AuthGuard from '../../components/shared-components/AuthGuard';
import GenericLoading from '../../components/shared-components/GenericLoading';
import { fetchCategories } from '../../lib/api/categories.api';
import { fetchListing } from '../../lib/api/listing.api';
import { userAtom, userLoadingAtom } from '../../lib/atoms/user.atom';
import { Category } from '../../lib/interfaces/category.interface';
import { Listing } from '../../lib/interfaces/listing.interface';

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;
  let listingInfo = null;
  let categroies = null;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['listing'], async () => {
    const response = await fetchListing(id as string);
    listingInfo = response;
    return response;
  });

  await queryClient.prefetchQuery(['categories'], async () => {
    const response = await fetchCategories();
    categroies = response;
    return response;
  });

  return {
    props: {
      listingInfo,
      categroies,
    },
  };
}

export default function ListingPage({
  listingInfo,
  categroies,
}: Readonly<{
  id: string;
  listingInfo: Listing;
  categroies: Category[];
}>) {
  const [user, setUser] = useAtom(userAtom);
  const [userLoading, setUserLoading] = useAtom(userLoadingAtom);
  return (
    <>
      <AuthGuard loggedOutRedirectUrl="/">
        {!user || userLoading ? (
          <GenericLoading />
        ) : (
          <>
            <Header />
            <ListingLayout listing={listingInfo} categroies={categroies} />
          </>
        )}
      </AuthGuard>
    </>
  );
}
