import Header from "../components/ui/Header";
import Container from "../components/ui/Container";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import ServiceCard from "../components/ServiceCard";

const Services = () => {
  const axios = useAxios();

  const getServices = async () => {
    const res = await axios.get("/services");
    return res;
  };

  //get korbo tanStack diye
  const {
    status,
    data: services,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["service"],
    queryFn: getServices, //data jeta fetch kore anbe
    /*  queryFn:()=>{
      return axios.get("/services");
    } */
  });
  // console.log(data.data);

  if (isLoading) {
    return <p>Loading ....</p>;
  }
  if (isError) {
    return <p>Error ....{error}</p>;
  }
  // console.log(status);
  return (
    <>
      <Container className="mt-10">
        <Header title="Services">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate
          nobis excepturi delectus, ab id provident, voluptas iste ullam
          repellendus animi eos perspiciatis cumque. Quod sit laboriosam
          deleniti atque explicabo esse.
        </Header>
      </Container>
      <Container className="mb-64">
        <div className="grid grid-cols-3 gap-10">
          {/* Service Cards goes here */}
          {services?.data?.result.map((item) => (
            <ServiceCard key={item._id} service={item}></ServiceCard>
          ))}
        </div>
      </Container>
      <Container className="mb-16 -mt-48 flex justify-end">
        <div className="join border-2 border-primary">
          <button className="join-item btn btn-ghost">Prev</button>
          <button className="join-item btn btn-ghost">2</button>
          <button className="join-item btn  btn-ghost">3</button>
          <button className="join-item btn btn-ghost">4</button>
          <button className="join-item btn btn-ghost">Next</button>
        </div>
      </Container>
    </>
  );
};

export default Services;
