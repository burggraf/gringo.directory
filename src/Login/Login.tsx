import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonLoading, IonMenuButton, IonModal, IonPage, IonRow, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { User } from '@supabase/supabase-js'
import { arrowForwardOutline, closeOutline, helpCircleOutline, helpCircleSharp, link, lockClosedOutline, lockOpenOutline, logIn, logInOutline, logInSharp, logOutOutline, logOutSharp, mailOutline, personAdd, personOutline, personSharp, refreshCircle } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';

import ProviderSignInButton from './ProviderSignInButton';
import SupabaseAuthService from './supabase.auth.service';

import '../translations/i18n'
import './Login.css';

const supabaseAuthService = SupabaseAuthService.getInstance();
interface ContainerProps {
    showModal: boolean;
    setShowModal: Function;
    backdropDismiss?: boolean;
    profileFunction?: Function;
    providers?: string[];
    onSignIn?: Function;
    onSignOut?: Function;
	// data: string[];
    // index: number;
	// id: string;
	// title: string;
    // saveFunction: Function;
	// options: string[];
}

const validateEmail = (email: string) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Login: React.FC<ContainerProps> = ({
    showModal, setShowModal, backdropDismiss = false, 
    profileFunction, providers, onSignIn, onSignOut
}) => {
    const { t } = useTranslation()
    const loadProfile = async () => {
        if (profileFunction) {
            profileFunction();   
        }
    }
    
    const [showLoading, setShowLoading] = useState(false);

    const [user, setUser] = useState<User | null>(null)
    const history = useHistory();
    const [signUpMode, setSignUpMode] = useState(false);
    const [present, dismiss] = useIonToast();
    const [email, setEmail] = useState('');
	const [avatar, setAvatar] = useState('./assets/img/profile160x160.png');
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
        setShowLoading(true);

        const {user, session, error} = 
        await supabaseAuthService.signInWithEmail(email, password);
        if (error) { setShowLoading(false); toast(error.message); }

        else { 
            // window.location.href = '/';
            setShowLoading(false);
            setShowModal(false);
            if (onSignIn) {
                onSignIn(user, session);
            }
         }
    }
    const signUp = async () => {
        setShowLoading(true);

        const {user, session, error} = 
            await supabaseAuthService.signUpWithEmail(email, password);
            if (error) { console.error(error); setShowLoading(false);toast(error.message) }
            else { setShowLoading(false);toast('Please check your email for a confirmation link', 'success') }
        }
    const resetPassword = async () => {
        setShowLoading(true);
        const {data, error} = 
            await supabaseAuthService.resetPassword(email);
            if (error) { setShowLoading(false);toast(error.message) }
            else { setShowLoading(false);toast('Please check your email for a password reset link', 'success') }
        }
    const sendMagicLink = async () => {
        setShowLoading(true);
        const {user, session, error} = 
            await supabaseAuthService.sendMagicLink(email);
            if (error) { setShowLoading(false);toast(error.message) }
            else { setShowLoading(false);toast('Please check your email for a sign in link', 'success') }
        }
    const toggleSignUpMode = async () => {
        setSignUpMode(!signUpMode);
    }
	useEffect(() => {
		// Only run this one time!  No multiple subscriptions!
		supabaseAuthService.user.subscribe((user: User | null) => {
            setUser(user);
			console.log('subscribed: user', user)
		})
	}, []) // <-- empty dependency array
	const signOut = async () => {
		const { error } = await supabaseAuthService.signOut()
		if (error) {
			console.error('Error signing out', error)
		} else {
            if (onSignOut) {
                onSignOut();
            }
        }
	}
    
  return (
      <>
    <IonModal 
    isOpen={showModal} 
    backdropDismiss={backdropDismiss}
    className='my-custom-class'>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color='primary' onClick={() => setShowModal(false)}>
                    <IonIcon size='large' icon={closeOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Sign In</IonTitle>
        </IonToolbar>
        <IonButtons slot="start">
        </IonButtons>
      </IonHeader>
      <IonContent>
          <IonLoading isOpen={showLoading} message={'Loading'} />


        <IonGrid class="ion-padding" style={{maxWidth: '375px'}}>
            <IonRow>
                <IonCol>
                    <IonLabel>Email Address</IonLabel>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>

                    <IonItem className="loginItem" lines="none">
                        <IonInput type="email"
                        placeholder="Email" 
                        onIonChange={e => setEmail(e.detail.value!)}
                        value={email} className="loginInputBoxWithIcon">
                        <IonIcon className="inputIcon" icon={mailOutline} slot="start" size="large" color="medium"></IonIcon>
                        </IonInput>
                    </IonItem>

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
                    <IonLabel>Password</IonLabel>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem className="loginItem" lines="none">
                        <IonInput type="password" 
                        placeholder="Password" 
                        onIonChange={e => setPassword(e.detail.value!)}
                        value={password} className="loginInputBoxWithIcon">
                        <IonIcon className="inputIcon" 
                        icon={password.length ? lockOpenOutline: lockClosedOutline} 
                        slot="start" size="large" color="medium"></IonIcon>
                        </IonInput> 
                    </IonItem>
                    <div onClick={resetPassword} className="ion-text-right" style={{paddingTop:'10px'}}>
                        <IonLabel><b>Forgot password?</b></IonLabel>
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
                        <IonButton expand="block" color="primary"
                        disabled={!validateEmail(email) || password.length < 6}
                        onClick={signInWithEmail}>
                            <IonIcon icon={arrowForwardOutline} size="large" />&nbsp;&nbsp;
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
        <IonLabel>or, sign in with:</IonLabel>
        </div>
        <IonGrid class="ion-padding ion-text-center" style={{maxWidth: '375px'}}>
            <IonRow>
                <IonCol>
            {providers && providers.indexOf('google') > -1 &&  <ProviderSignInButton name="google" color="rgb(227,44,41)" onSignIn={onSignIn} />}
            {providers && providers.indexOf('facebook') > -1 &&  <ProviderSignInButton name="facebook" color="rgb(59,89,152)" onSignIn={onSignIn} />}
            {providers && providers.indexOf('spotify') > -1 &&  <ProviderSignInButton name="spotify" color="rgb(36,203,75)" onSignIn={onSignIn} />}
            {providers && providers.indexOf('twitter') > -1 &&  <ProviderSignInButton name="twitter" color="rgb(30,135,235)" onSignIn={onSignIn} />}
            {providers && providers.indexOf('apple') > -1 &&  <ProviderSignInButton name="apple" color="gray" onSignIn={onSignIn} />}
            {providers && providers.indexOf('spotify') > -1 &&  <ProviderSignInButton name="spotify" color="rgb(36,203,75)" onSignIn={onSignIn} />}
            {providers && providers.indexOf('slack') > -1 &&  <ProviderSignInButton name="slack" color="rgb(221,157,35)" onSignIn={onSignIn} />}
            {providers && providers.indexOf('twitch') > -1 &&  <ProviderSignInButton name="twitch" color="rgb(120,34,244)" onSignIn={onSignIn} />}            
            {providers && providers.indexOf('discord') > -1 &&  <ProviderSignInButton name="discord" color="rgb(116,131,244)" onSignIn={onSignIn} />}
            {providers && providers.indexOf('github') > -1 &&  <ProviderSignInButton name="github" color="rgb(0,0,0)" onSignIn={onSignIn} />}
            {providers && providers.indexOf('bitbucket') > -1 &&  <ProviderSignInButton name="bitbucket" color="rgb(56,98,169)" onSignIn={onSignIn} />}
            {providers && providers.indexOf('gitlab') > -1 &&  <ProviderSignInButton name="gitlab" color="rgb(209,44,30)" onSignIn={onSignIn} />}
            {providers && providers.indexOf('azure') > -1 &&  <ProviderSignInButton name="azure" color="rgb(228,54,26)" onSignIn={onSignIn} />}
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
    </IonModal>
    {!user && (
        <IonItem lines='none' detail={false} onClick={() => setShowModal(true)}>
            <IonIcon slot='start' ios={logInOutline} md={logInSharp}></IonIcon>
            <div style={{width: '100%'}}>
                <IonButton fill='outline' color='dark'
                    size='small' expand='block' strong>
                    {t('Sign In')}
                </IonButton>
            </div>
        </IonItem>
    )}
    {user && (
        <>
        <IonItem lines='none' detail={false} 
            style={{cursor: profileFunction ? 'pointer' : 'default'}}
            onClick={loadProfile}
        >
            <IonIcon slot='start' ios={personOutline} md={personSharp}></IonIcon>
            <IonLabel className='ion-text-center ion-text-wrap'>
                <strong>{user?.email}</strong>
            </IonLabel>
        </IonItem>
        <IonItem lines='none' detail={false} onClick={signOut}>
            <IonIcon slot='start' ios={logOutOutline} md={logOutSharp}></IonIcon>
            <div style={{width: '100%'}}>
                <IonButton fill='outline' color='dark'
                    size='small' expand='block' strong>
                    {t('Sign Out')}
                </IonButton>
            </div>
        </IonItem>
        </>
    )}
    </>
  );
};

export default Login;
