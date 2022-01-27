import { IonButton, IonCol, IonContent, IonFooter, IonGrid, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonRow, IonSearchbar, IonText } from '@ionic/react'
import { User } from '@supabase/supabase-js'
import { airplaneOutline, airplaneSharp, archiveOutline, archiveSharp, bedOutline, bedSharp, bookmarkOutline, fastFood, fastFoodOutline, fastFoodSharp, heartOutline, heartSharp, homeOutline, homeSharp, informationCircleOutline, informationCircleSharp, languageOutline, languageSharp, logInOutline, logInSharp, logOutOutline, logOutSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, personOutline, personSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons'
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
					{/* <IonListHeader style={{backgroundColor: 'pink'}}> */}
					<div style={{paddingLeft: '10px', verticalAlign: 'top'}}>
						<IonIcon style={{verticalAlign: 'top', marginTop: '10px'}} src='/assets/logo.svg' size='large'></IonIcon>
						<IonLabel style={{verticalAlign: 'bottom', color:'#D35C23', fontSize: '20pt', fontWeight: 'bold'}}>&nbsp;&nbsp;Gringo Directory</IonLabel>
					</div>
					{/* </IonListHeader> */}
					<div style={{ marginLeft: '55px', color:'#D35C23' }}>
						<b>{t('slogan')}</b>
					</div>
					<div className='ion-text-center'>
						<h3>
							<b>{t('manta')}</b>
						</h3>
					</div>
				</IonList>

				<IonSearchbar
					value={searchText}
					debounce={750}
					onIonChange={(e) => setSearchText(e.detail.value!)}></IonSearchbar>

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
