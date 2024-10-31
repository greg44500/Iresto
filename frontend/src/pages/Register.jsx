import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useRegisterUserMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
/*Yup Schema Validation */
const validationSchema = Yup.object().shape({
  firstname: Yup.string().required("Le prénom est requis"),
  lastname: Yup.string().required("Le nom est requis"),
  email: Yup.string().email("Email invalide").required("L'email est requis"),
  password: Yup.string()
    .min(6, "Le mot de passe doit comporter au moins 6 caractères")
    .required("Le mot de passe est requis"),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      "Les mots de passe doivent être identiques"
    )
    .required("La confirmation du mot de passe est requise"),
});

function Register() {
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
  const { userInfo } = useSelector((state) => state.auth);
  const [registerMutation, { isLoading }] = useRegisterUserMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (data) => {
    const { firstname, lastname, email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      toast.error("Les mots de passe doivent être identiques");
    } else {
      try {
        const res = await registerMutation({
          firstname,
          lastname,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
      } catch (err) {
        reset();
        toast.error(err.data.message || err.error);
        console.log(err);
      }
    }
  };

  return (
    <FormContainer>
      <form className="font-[Roboto]" onSubmit={handleSubmit(submitHandler)}>
        <h2 className="text-center text-xl font-[Poppins] font-semibold mb-5">
          Création de votre compte
        </h2>

        {/* Champ prénom */}
        <div className="w-auto mb-3">
          <label htmlFor="firstname">Prénom :</label>
          <input
            type="text"
            id="firstname"
            {...register("firstname", { required: true })}
            className="custom-login-register"
          />
          {errors.firstname && (
            <p className="custom-validation-error">
              {errors.firstname.message}
            </p>
          )}
        </div>

        {/* Champ Nom */}
        <div className="w-auto mb-3">
          <label htmlFor="lastname">Nom :</label>
          <input
            type="text"
            id="lastname"
            {...register("lastname")}
            className="custom-login-register"
          />
          {errors.lastname && (
            <p className="custom-validation-error">{errors.lastname.message}</p>
          )}
        </div>

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

        {/* Champ Confirmation du mot de passe */}
        <div className="w-auto mb-3">
          <label htmlFor="confirmPassword">
            Confirmation du mot de passe :
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword")}
            className="custom-login-register"
          />
          {errors.confirmPassword && (
            <p className="custom-validation-error">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <button className="custom-header-button" type="submit">
            S'inscrire
          </button>
          {isLoading && <Loader />}
        </div>

        <p>
          Déjà inscrit(e) ?{" "}
          <Link
            to="/login"
            className="underline hover:text-brique2 hover:font-semibold transition duration-300"
          >
            Se connecter
          </Link>
        </p>
      </form>
    </FormContainer>
  );
}

export default Register;
