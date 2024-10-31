import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
/*Yup Schema Validation */
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email invalide").required("L'email est requis"),
  password: Yup.string()
    .min(6, "Le mot de passe doit comporter au moins 6 caractères")
    .required("Le mot de passe est requis"),
});
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/landing");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (data) => {
    try {
      const res = await login({
        email: data.email,
        password: data.password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      reset();
      toast.error(err.data.message || err.error);
    }
  };
  return (
    <FormContainer>
      <form className="font-[Roboto]" onSubmit={handleSubmit(submitHandler)}>
        <h2 className="text-center text-xl font-[Poppins] font-semibold mb-5 uppercase ">
          Connexion
        </h2>

        {/* Champ email */}
        <div className="w-auto mb-3">
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="custom-login-register"
          />
          {errors.email && (
            <p className="custom-validation-error">{errors.email.message}</p>
          )}
        </div>

        {/* Champ mot de passe */}
        <div className="w-auto mb-3">
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="custom-login-register"
          />
          {errors.password && (
            <p className="custom-validation-error">{errors.password.message}</p>
          )}
        </div>

        {/* Bouton d'inscription */}

        <div className="flex gap-2">
          <button className="custom-header-button" type="submit">
            Se connecter
          </button>
          {isLoading && <Loader />}
        </div>

        <p>
          Pas encore inscrit(e) ?{" "}
          <Link
            to="/register"
            className="underline hover:text-brique2 hover:font-semibold transition duration-300"
          >
            S'inscrire
          </Link>
        </p>
      </form>
    </FormContainer>
  );
}

export default Login;
