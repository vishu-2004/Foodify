import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  const fetchSession = async () => {

    try {
      setLoading(true);
      const { data: sessionData, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error.message);
        return;
      } else {
        setSession(sessionData.session);

        if (sessionData.session) {
          const { data: userProfile, error: userError } = await supabase
            .from("users")
            .select("*")
            .eq("id", sessionData.session.user.id)
            .single();

          if (userError) {
            console.error("Error fetching user profile:", userError.message);
          } else {
            console.log(userProfile);
            setProfile(userProfile || null); 
          }
        }
      }
    } catch (error) {
      console.error("Error in fetchSession:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    
    fetchSession();

   supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

   
  }, []);

  return (
    <AuthContext.Provider value={{ session, loading,profile,fetchSession,setProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;

