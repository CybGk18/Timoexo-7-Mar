import { useEffect, useState } from 'react';
import { CONTACT_PROMPT_DELAY, ESCALATION_PROMPT_DELAY } from '@/lib/chatConstants';

export const useChatTimers = (chatStartTime: number | null, isChatStage: boolean) => {
  const [shouldRequestContact, setShouldRequestContact] = useState(false);
  const [shouldShowEscalation, setShouldShowEscalation] = useState(false);

  useEffect(() => {
    if (!isChatStage || !chatStartTime) {
      setShouldRequestContact(false);
      setShouldShowEscalation(false);
      return;
    }

    const contactTimer = setTimeout(() => {
      setShouldRequestContact(true);
    }, CONTACT_PROMPT_DELAY);

    const escalationTimer = setTimeout(() => {
      setShouldShowEscalation(true);
    }, ESCALATION_PROMPT_DELAY);

    return () => {
      clearTimeout(contactTimer);
      clearTimeout(escalationTimer);
    };
  }, [chatStartTime, isChatStage]);

  return {
    shouldRequestContact,
    shouldShowEscalation,
  };
};