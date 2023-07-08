import ProfileForm from "../../components/Form/ProfileForm";
import { useEffect, useState } from "react";
import axios from "axios";
import userStore from "../../stores/stores";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const getUserid = userStore((state) => state.userId);

  useEffect(() => {
    async function fetchData() {
      try {
        const [profileResponse, tutorResponse] = await Promise.all([
          axios.get(`http://localhost:3001/profile/${getUserid}`),
          axios.get(`http://localhost:3001/tutor/${getUserid}`),
        ]);
        setProfile(profileResponse.data.result);
        setTutor(tutorResponse.data.result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && <ProfileForm profile={profile} tutor={tutor} />}
    </>
  );
};

export default UserProfile;
