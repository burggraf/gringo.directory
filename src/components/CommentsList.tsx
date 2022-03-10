import { createClient, User } from '@supabase/supabase-js'
import { SupabaseAuthService } from 'ionic-react-supabase-login'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AuthModal, Comments, CommentsProvider } from 'supabase-comments-extension'

import { keys } from '../services/keys.service'

import '../translations/i18n'
import './CommentsList.css'

interface ContainerProps {
	topic: string
}
// supabaseAuthService.setShowLogin
const supabase = createClient(keys.SUPABASE_URL, keys.SUPABASE_KEY)
const CommentsList: React.FC<ContainerProps> = ({ topic }) => {
	const { t } = useTranslation()
	const [modalVisible, setModalVisible] = useState(false)

	return (
		<div
			style={{
				maxWidth: '600px',
				marginLeft: 'auto',
				marginRight: 'auto',
			}}>
			<CommentsProvider
				key={`CommentsProvider-${topic}`}
				supabaseClient={supabase}
				mode={window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'}
				// onAuthRequested={() => setModalVisible(true)}
				onAuthRequested={() => {
					// supabaseAuthService.setShowLogin(true)

				}}>
				{/* <AuthModal
        visible={modalVisible}
        onAuthenticate={() => setModalVisible(false)}
        onClose={() => setModalVisible(false)}
      /> */}
				<Comments key={`Comments-${topic}`} topic={topic} />
			</CommentsProvider>
		</div>
	)
}

export default CommentsList
