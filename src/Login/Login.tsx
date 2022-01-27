import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { link, logIn, personAdd, refreshCircle } from 'ionicons/icons';
import { useState } from 'react';

import ProviderSignInButton from './ProviderSignInButton';
import SupabaseAuthService from './supabase.auth.service';

import './Login.css';
import { useHistory } from 'react-router';

const supabaseAuthService = SupabaseAuthService.getInstance();

const validateEmail = (email: string) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Login: React.FC = () => {
    const history = useHistory();
    const [signUpMode, setSignUpMode] = useState(false);
    const [present, dismiss] = useIonToast();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = (message: string, color: string = 'danger') => {
        present({
            color: color,
            message: message,
            cssClass: 'toast',
            buttons: [{ icon: 'close', handler: () => dismiss() }],
            duration: 6000,
            //onDidDismiss: () => console.log('dismissed'),
            //onWillDismiss: () => console.log('will dismiss'),
          })
    }
    const signInWithEmail = async () => {
        const {user, session, error} = 
        await supabaseAuthService.signInWithEmail(email, password);
        if (error) { toast(error.message) }
        else { 
            // console.log('signInWithEmail: user, session, error', user, session, error);
            window.location.href = '/';
            // history.replace('/');
         }
    }
    const signUp = async () => {
        const {user, session, error} = 
            await supabaseAuthService.signUpWithEmail(email, password);
            if (error) { console.error(error); toast(error.message) }
            else { toast('Please check your email for a confirmation link', 'success') }
        }
    const resetPassword = async () => {
        const {data, error} = 
            await supabaseAuthService.resetPassword(email);
            if (error) { toast(error.message) }
            else { toast('Please check your email for a password reset link', 'success') }
        }
    const sendMagicLink = async () => {
        const {user, session, error} = 
            await supabaseAuthService.sendMagicLink(email);
            if (error) { toast(error.message) }
            else { toast('Please check your email for a sign in link', 'success') }
        }
    const toggleSignUpMode = async () => {
        setSignUpMode(!signUpMode);
    }
    
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/page" />
          </IonButtons>
          <IonTitle>Sign In</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid class="ion-padding" style={{maxWidth: '375px'}}>
            <IonRow>
                <IonCol>
                    <IonLabel><b>Email</b></IonLabel>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonInput type="email" 
                    placeholder="Enter your email" 
                    onIonChange={e => setEmail(e.detail.value!)}
                    value={email} className="inputBox" />
                </IonCol>
            </IonRow>
            {!validateEmail(email) && email.length > 0 && 
                <IonRow>
                    <IonCol>
                        <IonLabel color="danger"><b>Invalid email format</b></IonLabel>
                    </IonCol>
                </IonRow>
            }
            <IonRow>
                <IonCol>
                    <IonLabel><b>Password</b></IonLabel>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonInput type="password" 
                    placeholder="Enter your password" 
                    onIonChange={e => setPassword(e.detail.value!)}
                    value={password} className="inputBox" />
                    <div onClick={resetPassword} className="ion-text-right" style={{paddingTop:'10px'}}>
                        <IonLabel>Forgot password?</IonLabel>
                    </div>
                </IonCol>
            </IonRow>
            {password.length > 0 && password.length < 6 && 
                <IonRow>
                    <IonCol>
                        <IonLabel color="danger"><b>Password too short</b></IonLabel>
                    </IonCol>
                </IonRow>
            }
            { !signUpMode &&
                <IonRow>
                    <IonCol>
                        <IonButton expand="block" 
                        disabled={!validateEmail(email) || password.length < 6}
                        onClick={signInWithEmail}>
                            <IonIcon icon={logIn} size="large" />&nbsp;&nbsp;
                            <b>Sign in with email</b>
                        </IonButton>
                        <div onClick={toggleSignUpMode} className="ion-text-center" style={{paddingTop:'10px'}}>
                            <IonLabel>Don't have an account? <b>Sign Up</b></IonLabel>
                        </div>
                    </IonCol>
                </IonRow>
            }
            { signUpMode &&
                <IonRow>
                    <IonCol>
                            <IonButton expand="block" 
                            disabled={!validateEmail(email) || password.length < 6}
                            onClick={signUp}>
                            <IonIcon icon={personAdd} size="large" />&nbsp;&nbsp;
                            <b>Sign Up</b></IonButton>
                            <div onClick={toggleSignUpMode} className="ion-text-center" style={{paddingTop:'10px'}}>
                            <IonLabel>Already have an account? <b>Sign In</b></IonLabel>
                        </div>
                    </IonCol>
                    {/* <IonCol>
                        <IonButton expand="block" 
                        disabled={!validateEmail(email) || password.length > 0}
                        onClick={resetPassword}>
                        <IonIcon icon={refreshCircle} size="large" />&nbsp;&nbsp;
                        <b>Reset Password</b></IonButton>
                    </IonCol> */}
                </IonRow>
            }
            <IonRow>
                <IonCol>
                    <div className="ion-text-center" style={{marginBottom: '10px'}}>
                        <IonLabel><b>or</b></IonLabel>
                    </div>
                    <IonButton expand="block" 
                    disabled={!validateEmail(email) || password.length > 0}
                    onClick={sendMagicLink}>
                    <IonIcon icon={link} size="large" />&nbsp;&nbsp;
                    <b>Send Sign In Link</b></IonButton>                    
                </IonCol>
            </IonRow>
        </IonGrid>
        <div className="ion-text-center">
        <IonLabel><b>or, sign in with:</b></IonLabel>
        </div>
        <IonGrid class="ion-padding" style={{maxWidth: '375px'}}>
            <IonRow>
                <IonCol>


            <ProviderSignInButton name="google" color="rgb(227,44,41)" />
            <ProviderSignInButton name="facebook" color="rgb(59,89,152)" />
            <ProviderSignInButton name="spotify" color="rgb(36,203,75)" />
            <ProviderSignInButton name="twitter" color="rgb(30,135,235)" />
            {/* <ProviderSignInButton name="apple" color="gray" />
            <ProviderSignInButton name="spotify" color="rgb(36,203,75)" />
            <ProviderSignInButton name="slack" color="rgb(221,157,35)" />
            <ProviderSignInButton name="twitch" color="rgb(120,34,244)" />            
            <ProviderSignInButton name="discord" color="rgb(116,131,244)" />
            <ProviderSignInButton name="github" color="rgb(0,0,0)" />
            <ProviderSignInButton name="bitbucket" color="rgb(56,98,169)" />
            <ProviderSignInButton name="gitlab" color="rgb(209,44,30)" />
            <ProviderSignInButton name="azure" color="rgb(228,54,26)" /> */}
            </IonCol>
            </IonRow>
        </IonGrid>

        <div onClick={() => { history.push('/privacy')}}
            className="ion-text-center" style={{marginTop: '10px', marginBottom: '30px'}}>
            <IonLabel>View our privacy policy</IonLabel>
        </div>
        <div onClick={() => { history.push('/terms')}}
            className="ion-text-center" style={{marginBottom: '60px'}}>
            <IonLabel>View our terms of service</IonLabel>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Login;
