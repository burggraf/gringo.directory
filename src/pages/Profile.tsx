import {
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonIcon,
	IonInput,
	IonItem,
	IonLabel,
	IonList,
	IonMenuButton,
	IonPage,
	IonTextarea,
	IonTitle,
	IonToolbar,
	useIonViewWillEnter,
} from '@ionic/react'
//import { useParams } from 'react-router';
//import ExploreContainer from '../components/ExploreContainer';
import './Profile.css'
import SupabaseDataService from '../services/supabase.data.service'
import SupabaseAuthService from '../Login/supabase.auth.service'
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { checkmarkOutline } from 'ionicons/icons'
const supabaseDataService = SupabaseDataService.getInstance()
const supabaseAuthService = SupabaseAuthService.getInstance()

const Profile: React.FC = () => {
	const [profile, setProfile] = useState<any>(null)

	useEffect(() => {
		// Only run this one time!  No multiple subscriptions!
		supabaseAuthService.profile.subscribe((profile: any | null) => {
			setProfile(profile)
		})
	}, []) // <-- empty dependency array

	// const { name } = useParams<{ name: string; }>();
	const save = async () => {
		await supabaseDataService.saveProfile(profile)
		await supabaseAuthService.loadProfile()
	}

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot='start'>
						<IonMenuButton />
					</IonButtons>
					<IonTitle>My Profile</IonTitle>
					<IonButtons slot='end'>
						<IonButton color='primary' onClick={save}>
							<IonIcon size='large' icon={checkmarkOutline}></IonIcon>
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>

			<IonContent className='ion-padding'>
				{/* <pre>{JSON.stringify(profile, null, 2)}</pre> */}
				<IonList>
					<IonItem lines="none">
						<IonLabel slot='start' class="itemLabel">First Name</IonLabel>
						<IonInput
							type='text'
							placeholder={'First Name'}
							onIonChange={(e: any) => setProfile({ ...profile, firstname: e.detail.value! })}
							value={profile?.firstname!}
							class='inputBox'></IonInput>
					</IonItem>
					<IonItem lines="none">
						<IonLabel slot='start' class="itemLabel">Last Name</IonLabel>
						<IonInput
							type='text'              
							placeholder={'Last Name'}
							onIonChange={(e: any) => setProfile({ ...profile, lastname: e.detail.value! })}
							value={profile?.lastname!}
							class='inputBox'></IonInput>
					</IonItem>
					<IonItem lines="none">
						<IonLabel slot='start' class="itemLabel">Email</IonLabel>
						<IonInput
							type='text'
              disabled={true}
							placeholder={'Email'}
							value={profile?.email!}
							class='inputBox'></IonInput>
					</IonItem>
					<IonItem lines="none">
						<IonLabel slot='start' class="itemLabel">Phone</IonLabel>
						<IonInput
							type='number'
							placeholder={'Phone'}
							onIonChange={(e: any) => setProfile({ ...profile, phone: e.detail.value! })}
							value={profile?.phone!}
							class='inputBox'></IonInput>
					</IonItem>
					<IonItem lines="none">
						<IonLabel slot='start' class="itemLabel">Address</IonLabel>
						<IonInput
							type='text'
							placeholder={'Address'}
							onIonChange={(e: any) => setProfile({ ...profile, address: e.detail.value! })}
							value={profile?.address!}
							class='inputBox'></IonInput>
					</IonItem>
					<IonItem lines="none">
						<IonLabel slot='start' class="itemLabel">City</IonLabel>
						<IonInput
							type='text'
							placeholder={'City'}
							onIonChange={(e: any) => setProfile({ ...profile, city: e.detail.value! })}
							value={profile?.city!}
							class='inputBox'></IonInput>
					</IonItem>
					<IonItem lines="none">
						<IonLabel slot='start' class="itemLabel">State</IonLabel>
						<IonInput
							type='text'
							placeholder={'State'}
							onIonChange={(e: any) => setProfile({ ...profile, state: e.detail.value! })}
							value={profile?.state!}
							class='inputBox'></IonInput>
					</IonItem>
					<IonItem lines="none">
						<IonLabel slot='start' class="itemLabel">Zip</IonLabel>
						<IonInput
							type='text'
							placeholder={'Postal Code'}
							onIonChange={(e: any) => setProfile({ ...profile, postal_code: e.detail.value! })}
							value={profile?.postal_code!}
							class='inputBox'></IonInput>
					</IonItem>
					<IonItem lines="none">
						<IonLabel slot='start' class="itemLabel">About me...</IonLabel>
						<IonTextarea
              rows={3}
              autoGrow={true}
							placeholder={'What would you like to tell us about yourself?'}
							onIonChange={(e: any) => setProfile({ ...profile, bio: e.detail.value! })}
							value={profile?.bio!}
							class='inputBox'></IonTextarea>
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	)
}

export default Profile
