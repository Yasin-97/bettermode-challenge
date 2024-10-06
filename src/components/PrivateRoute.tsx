import { Navigate, RouteProps } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Cookies from "universal-cookie";
import { useDecodeJWT } from "@/lib/useDecodeJWT";
import { Loader } from "@/components";
import PublicLayout from "@/layouts/PublicLayout";
import { ReactNode } from "react";
import { GetMemberQuery } from "@/graphql/member/type";
import { GET_MEMBER } from "@/graphql/member";

type PrivateRouteProps = RouteProps & {
  element: ReactNode & (() => Element);
};

const PrivateRoute = ({ element: Component, ...rest }: PrivateRouteProps) => {
  const cookies = new Cookies();
  const token = cookies.get("access_token");
  const decodedToken = useDecodeJWT(token);

  const { data, loading, error } = useQuery<GetMemberQuery>(GET_MEMBER, {
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
