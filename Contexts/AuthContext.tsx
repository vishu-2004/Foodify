import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { userDetails } from "../types/user";

const AuthContext = createContext<AuthContextType | undefined>(undefined);
interface AuthContextType {
  session: Session | null;
  loading: boolean;
  profile: userDetails | null;
  fetchSession: () => Promise<void>;
  setProfile: React.Dispatch<React.SetStateAction<userDetails | null>>;
}

interface authProps {
  children: React.ReactNode;
}

const AuthProvider:React.FC<authProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<userDetails|null>(null);

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
            console.log("userProfile",userProfile)
            
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

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;

