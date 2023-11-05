import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import Container from "../components/ui/Container";

const TrackOrder = () => {
const axios = useAxios()
const {user} = useAuth()
// console.log(user);

const {data:bookings} = useQuery(
  {
    queryKey: ['booking'],
    queryFn: async () =>{
      const email = user.email
      const res = await axios.get(`/user/bookings?email=${email}`);
      return res
    }
  }
)
// console.log(bookings.data);
  return (
    <Container>
     {
      bookings?.data?.map(item=><div key={item._id} className=" border-2 border-green-600 my-10 p-10">
        <h1>{item?.service}</h1>
        <button className="btn btn-error">Cancel</button>
      </div>)

      }
    </Container>
  );
};

export default TrackOrder;
