import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

function Profile() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setFirstname(userInfo.firstname);
    setLastname(userInfo.lastname);
    setEmail(userInfo.email);
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Les mots de passe doivent être identiques");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          firstname,
          lastname,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profil mis à jour !");
        navigate("/landing");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <FormContainer>
      <form className="font-[Roboto]" onSubmit={submitHandler}>
        <h2 className="text-center text-xl font-[Poppins] font-semibold mb-5">
          Modifier mes informations
        </h2>
        {/* Champ prénom */}
        <div>
          <label htmlFor="firstname">Prénom :</label>
          <input
            type="text"
            id="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
            className="border h-8 w-full mb-5"
          />
        </div>
        {/* Champ Nom */}
        <div>
          <label htmlFor="Lastname">Nom :</label>
          <input
            type="text"
            id="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
            className="border h-8 w-full mb-5"
          />
        </div>

        {/* Champ email */}
        <div>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border h-8 w-full mb-5"
          />
        </div>

        {/* Champ mot de passe */}
        {/* <div>
          <label htmlFor="password" className="block text-gray-700">
            Mot de passe :
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border h-8 w-full mb-5"
          />
        </div> */}
        {/* Champ Confirmation du mot de passe */}
        {/* <div>
          <label htmlFor="password" className="block text-gray-700">
            Confirmation du mot de passe :
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border h-8 w-full mb-5"
          />
        </div> */}

        {/* Bouton d'inscription */}
        <div className="flex gap-2">
          <button className="custom-header-button" type="submit">
            Valider
          </button>
          {isLoading && <Loader />}
        </div>
      </form>
    </FormContainer>
  );
}

export default Profile;
