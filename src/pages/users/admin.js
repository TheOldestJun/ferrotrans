import { useQuery, useMutation } from "react-query";
import { getAllUsers } from "@/services/users";
import { Container } from "@mui/material";
import Info from "@/components/Info";
import AdminPanel from "@/components/AdminPanel";
import prisma from "../../../prisma";
import Oops from "@/components/Oops";
import { useSelector } from "react-redux";

const Admin = ({ roles }) => {
  const login = useSelector((state) => state.login.login);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
  if (!login) {
    return <Oops />;
  }
  return (
    <Container>
      {isLoading && <Info message={"Loading"} />}
      {isError && <Info message={"Error"} />}
      {data && <AdminPanel data={data} rolesData={roles} />}
    </Container>
  );
};

export default Admin;

export const getServerSideProps = async () => {
  const roles = await prisma.role.findMany();
  return {
    props: {
      roles,
    },
  };
};
