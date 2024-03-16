export function openMessagesPane() {
  if (typeof window !== 'undefined') {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.setProperty('--MessagesPane-slideIn', '1');
  }
}

export function closeMessagesPane() {
  if (typeof window !== 'undefined') {
    document.documentElement.style.removeProperty('--MessagesPane-slideIn');
    document.body.style.removeProperty('overflow');
  }
}

export function toggleMessagesPane() {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const slideIn = window.getComputedStyle(document.documentElement).getPropertyValue('--MessagesPane-slideIn');
    if (slideIn) {
      closeMessagesPane();
    } else {
      openMessagesPane();
    }
  }
}

export function openMessagesSettingPane() {
  if (typeof window !== 'undefined') {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.setProperty('--MessagesSettingPane-slideIn', '-1');
  }
}

export function closeMessagesSettingPane() {
  if (typeof window !== 'undefined') {
    document.documentElement.style.removeProperty('--MessagesSettingPane-slideIn');
    document.body.style.removeProperty('overflow');
  }
}

export function toggleMessagesSettingPane() {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const slideIn = window.getComputedStyle(document.documentElement).getPropertyValue('--MessagesSettingPane-slideIn');
    if (slideIn) {
      closeMessagesSettingPane();
    } else {
      openMessagesSettingPane();
    }
  }
}
