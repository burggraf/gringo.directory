import { IonButton, IonCol, IonContent, IonFooter, IonGrid, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonRow, IonSearchbar, IonText } from '@ionic/react'
import { User } from '@supabase/supabase-js'
import { airplaneOutline, airplaneSharp, archiveOutline, archiveSharp, bedOutline, bedSharp, bookmarkOutline, businessOutline, businessSharp, fastFood, fastFoodOutline, fastFoodSharp, heartOutline, heartSharp, homeOutline, homeSharp, informationCircleOutline, informationCircleSharp, languageOutline, languageSharp, logInOutline, logInSharp, logOutOutline, logOutSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, peopleOutline, peopleSharp, personOutline, personSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import SupabaseAuthService from '../Login/supabase.auth.service'
import { selectLanguage } from '../translations/i18n'
import ItemPicker from './ItemPicker'

import '../translations/i18n'
import './Menu.css'

const supabaseAuthService = SupabaseAuthService.getInstance()

interface AppPage {
	url: string
	iosIcon: string
	mdIcon: string
	title: string
}

const languageOptions = [
	{ text: 'English', value: 'en' },
	{ text: 'Español', value: 'es' },
	{ text: '简体中文', value: 'zh' },
]

const Menu: React.FC = () => {
	const [searchText, setSearchText] = useState('')
	const [currentLanguage, setCurrentLanguage] = useState<string>(
		localStorage.getItem('language') || 'en'
	)
	const location = useLocation()
	const { t } = useTranslation()
	const [email, setEmail] = useState('')
	const [avatar, setAvatar] = useState('./assets/img/profile160x160.png')
	let _user: User | null = null

	const appPages: AppPage[] = [
		{
			title: t('Come'),
			url: '/come',
			iosIcon: airplaneOutline,
			mdIcon: airplaneSharp,
		},
		{
			title: t('Stay'),
			url: '/stay',
			iosIcon: bedOutline,
			mdIcon: bedSharp,
		},
		{
			title: t('Enjoy'),
			url: '/enjoy',
			iosIcon: fastFoodOutline,
			mdIcon: fastFoodSharp,
		},
		{
			title: t('Live'),
			url: '/live',
			iosIcon: homeOutline,
			mdIcon: homeSharp,
		},
		{
			title: t('Orgs'),
			url: '/orgs',
			iosIcon: businessOutline,
			mdIcon: businessSharp,
		},
		{
			title: t('People'),
			url: '/people',
			iosIcon: peopleOutline,
			mdIcon: peopleSharp,
		},
		{
			title: t('About Us'),
			url: '/about',
			iosIcon: informationCircleOutline,
			mdIcon: informationCircleSharp,
		},
	]

	useEffect(() => {
		// Only run this one time!  No multiple subscriptions!
		supabaseAuthService.user.subscribe((user: User | null) => {
			_user = user
			console.log('subscribed: _user', _user)
			if (_user?.email) {
				setEmail(_user.email)
				setAvatar(_user?.user_metadata?.avatar_url || './assets/img/profile160x160.png')
			} else {
				setEmail('')
			}
		})
	}, []) // <-- empty dependency array

	useEffect(() => {
		selectLanguage(currentLanguage)
	}, [currentLanguage])

	useEffect(() => {
		console.log('searchText', searchText)
	}, [searchText])

	const signOut = async () => {
		const { error } = await supabaseAuthService.signOut()
		if (error) {
			console.error('Error signing out', error)
		}
	}
	// const selectLanguage = (lang: string) => {
	//   console.log('select', lang);
	// }
	return (
		<IonMenu contentId='main' type='overlay'>
			<IonContent>
				<IonList id='inbox-list'>
					<IonGrid style={{backgroundColor: 'transparent', marginBottom: '-10px'}}>
						<IonRow style={{width: '100%'}}>
							<IonCol size="2"><IonIcon src='/assets/logo.svg' size='large'></IonIcon></IonCol>
							<IonCol size="8" class="ion-text-center">
								<IonLabel style={{color:'#D35C23', fontSize: '16pt', fontWeight: 'bold'}}>Gringo Directory</IonLabel>
							</IonCol>
							<IonCol size="2" class="ion-text-right"><IonIcon src='/assets/locales/us.svg' size='large'></IonIcon></IonCol>
						</IonRow>
					</IonGrid>
					{/* <IonListHeader style={{backgroundColor: 'pink'}}> */}

					{/* <div style={{paddingLeft: '10px', paddingRight: '10px', verticalAlign: 'top', width: '100%'}}>
						<IonIcon style={{float: 'left', verticalAlign: 'top', marginTop: '10px'}} src='/assets/logo.svg' size='large'></IonIcon>
						<div style={{backgroundColor: 'pink', width: '100%', verticalAlign: 'bottom', color:'#D35C23', fontSize: '14pt', fontWeight: 'bold', textAlign: 'center'}}>
							Gringo Directory
						</div>
						<IonIcon style={{float: 'right', verticalAlign: 'top', marginTop: '10px'}} src='/assets/locales/us.svg' size='large'></IonIcon>
					</div> */}
					{/* </IonListHeader> */}

					<div className='ion-text-center' style={{ color:'#D35C23' }}>
						<b>{t('slogan')}</b>
					</div>
					
				</IonList>

				<IonSearchbar
					value={searchText}
					debounce={750}
					onIonChange={(e) => setSearchText(e.detail.value!)}></IonSearchbar>
				
				<div className='ion-text-left' style={{color:'#D35C23', fontSize: '16pt', paddingTop: '10px', paddingLeft: '10px'}}>
						<b>{t('manta')}</b>
				</div>

				<IonList id='inbox-list'>
					{appPages.map((appPage, index) => {
						return (
							<IonMenuToggle key={index} autoHide={false}>
								<IonItem
									className={location.pathname === appPage.url ? 'selected' : ''}
									routerLink={appPage.url}
									routerDirection='none'
									lines='none'
									detail={false}>
									<IonIcon slot='start' ios={appPage.iosIcon} md={appPage.mdIcon} />
									<IonLabel>{appPage.title}</IonLabel>
								</IonItem>
							</IonMenuToggle>
						)
					})}
				</IonList>
			</IonContent>
			<IonFooter>
				{email && (
					<IonMenuToggle key={'profile'} autoHide={false}>
					<IonItem routerDirection='root' routerLink='/profile' lines='none' detail={false}>
						<IonIcon slot='start' ios={personOutline} md={personSharp}></IonIcon>
						<IonLabel className='ion-text-center'>
							<strong>{email}</strong>
						</IonLabel>
					</IonItem>
					</IonMenuToggle>
				)}
				<IonGrid>
					{!email && (
						<IonRow>
							<IonCol size='auto'>
								<IonIcon size='large' ios={logInOutline} md={logInSharp}></IonIcon>
							</IonCol>
							<IonCol>
								<IonMenuToggle key={'signin'} autoHide={false}>
									<IonButton size='small' expand='block' routerDirection='root' routerLink='/login' strong>
										{t('Sign In')}
									</IonButton>
								</IonMenuToggle>
							</IonCol>
						</IonRow>
					)}
					{email && (
						<IonRow>
							<IonCol size='auto'>
								<IonIcon size='large' ios={logOutOutline} md={logOutSharp}></IonIcon>
							</IonCol>
							<IonCol>
								<IonMenuToggle key={'signout'} autoHide={false}>
									<IonButton size='small' expand='block' href='' onClick={signOut} strong>
										{t('Sign Out')}
									</IonButton>
								</IonMenuToggle>
							</IonCol>
						</IonRow>
					)}
					<IonRow>
						<IonCol size='auto'>
							<IonIcon size='large' ios={languageOutline} md={languageSharp}></IonIcon>
						</IonCol>

						<IonCol>
							<ItemPicker
								stateVariable={currentLanguage}
								stateFunction={(e: any) => {
									setCurrentLanguage(e!)
								}}
								initialValue={currentLanguage}
								options={languageOptions}
								title={t('select_language')}
								displayText={true}
								buttonSize='small'
							/>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol className='ion-text-right' size='6'>
							<IonMenuToggle key={'privacy'} autoHide={false}>
								<IonButton
									routerLink='/privacy'
									routerDirection='forward'
									fill='clear'
									size='small'>
									Privacy Policy
								</IonButton>
							</IonMenuToggle>
						</IonCol>
						<IonCol className='ion-text-left' size='6'>
							<IonMenuToggle key={'terms'} autoHide={false}>
								<IonButton routerLink='/terms' routerDirection='forward' fill='clear' size='small'>
									Terms of Service
								</IonButton>
							</IonMenuToggle>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonFooter>
		</IonMenu>
	)
}

export default Menu
