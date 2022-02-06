import { useTranslation } from "react-i18next";

import "../translations/i18n";
import './CommentsList.css';
import { keys } from '../services/keys.service';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  Comments,
  AuthModal,
  CommentsProvider,
} from 'supabase-comments-extension';

interface ContainerProps {
  topic: string;
}

const supabase = createClient(keys.SUPABASE_URL, keys.SUPABASE_KEY);

const CommentsList: React.FC<ContainerProps> = ({ topic }) => {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <div style={{maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto'}}>
    <CommentsProvider
      key={`CommentsProvider-${topic}`}
      supabaseClient={supabase}
      // onAuthRequested={() => setModalVisible(true)}
      onAuthRequested={() => {
        window.location.href = '/login/' + encodeURIComponent(window.location.href);
      }}
    >
      {/* <AuthModal
        visible={modalVisible}
        onAuthenticate={() => setModalVisible(false)}
        onClose={() => setModalVisible(false)}
      /> */}
      <Comments key={`Comments-${topic}`} topic={topic} />
    </CommentsProvider></div>  );
};

export default CommentsList;
