import { useNavigate } from 'react-router-dom';
import '../../input.css';
import { useForm } from 'react-hook-form';
import { jwtDecode } from 'jwt-decode';

function LoginForm(){

    const navigate = useNavigate();
    const { register, control, handleSubmit, reset, trigger, setError} = useForm({
    });

    async function submitData(data){
       await  fetch("https://localhost:7036/api/Auth", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
          .then( response => {

             return response.json();
          }
        
        )
          .then(  data => {
            var decodeToken = jwtDecode(data.data);
            console.log(decodeToken);

            localStorage.setItem("token", data.data);
            localStorage.setItem("id",decodeToken.sid);
            localStorage.setItem("userName",decodeToken.name);
            localStorage.setItem("email",decodeToken.email);




            navigate({pathname:"/home"});
        
          })
          .catch(error => console.error(error));
    }

    return(
        <div className="flex absolute w-full h-[90%]  justify-center items-center">

        <form className="flex flex-col w-[50%] border border-black " onSubmit={handleSubmit(data =>submitData(data))}>
          <ul className="flex flex-col">
            E-mail
          <input
          type='email'
            {...register("email",  {  required: "Please enter your email." })} // custom message
          />
          Password
          <input
          type='password'
            {...register("password", { required: "Please enter your password." })} // custom message
          />
          </ul>
    
          <input type="submit" />
        </form>
        </div>
    
)
}

export default LoginForm;