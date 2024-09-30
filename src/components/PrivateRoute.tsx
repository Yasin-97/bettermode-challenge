import { Navigate, RouteProps } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_MEMBER } from "@/graphql/queries/member";
import Cookies from "universal-cookie";
import { useDecodeJWT } from "@/lib/useDecodeJWT";
import { Loader } from "@/components";
import PublicLayout from "@/layouts/PublicLayout";
import { ReactNode } from "react";

type PrivateRouteProps = RouteProps & {
  element: ReactNode & (() => Element);
};

const PrivateRoute = ({ element: Component, ...rest }: PrivateRouteProps) => {
  const cookies = new Cookies();
  const token = cookies.get("access_token");
  const decodedToken = useDecodeJWT(token);

  const { data, loading, error } = useQuery(GET_MEMBER, {
    variables: {
      id: decodedToken?.id,
    },
  });

  if (loading)
    return (
      <PublicLayout>
        <Loader text="Authenticating ..." />
      </PublicLayout>
    );

  if (!data?.member || error) {
    return <Navigate to="/login" />;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
