// Multi-language support for IPFSBED
let currentLang = localStorage.getItem('up2if_lang') || 'zh-CN';

// Dictionary for translations
const translations = {
  'zh-CN': {
    'meta-title': 'IPFSBED - 去中心化IPFS文件托管服务',
    'upload-title': '上传文件',
    'file-list': '个文件',
    'drop-zone': '点击上传 / 粘贴上传 / 拖拽上传',
    'drop-zone-desc': '去中心化保存和共享文件',
    'gateway-selector': '选择网关：',
    'copy-link': '复制链接',
    'copy-share-link': '复制分享链接',
    'copy-all': '复制全部',
    'select-all': '全选',
    'deselect-all-btn': '取消全选',
    'share-selected': '批量分享',
    'select-for-batch-sharing': '选择进行批量分享',
    'batch-share-confirm-copy': '确认并复制链接',
    'batch-share-cancel': '取消',
    'batch-share-link-copied': '批量分享链接已复制到剪贴板',
    'batch-encryption-failed': '批量加密失败',
    'show-password': '显示密码',
    'hide-password': '隐藏密码',
    'upload-success': '上传成功！',
    'upload-error': '上传失败！',
    'clipboard-empty': '剪贴板为空！',
    'clipboard-no-file': '剪贴板中没有图片！',
    'unsupported-type': '不支持的文件类型！',
    'file-too-large': '文件太大！最大 {size}MB',
    'file-size': '文件大小：{size}',
    'all-apis-failed': '所有API都失败了',
    'no-files-selected': '未选择任何文件',
    'selected-files-invalid': '所选文件无效',
    'copied-format': '已复制{format}',
    'copied-all': '已复制所有链接',
    'encryption-failed': '加密失败',
    'decryption-failed': '解密失败',
    'accessing-file': '正在访问文件...',
    'file-will-be-public': '文件将以公开方式分享',
    'download-button': '下载文件',
    'download-progress': '下载进度',
    'return-home': '返回首页',
    'project-repo': '项目地址',
    'more-gateways': '更多网关',
    'copyright-text': '© {year} IPFSBED - 基于IPFS的去中心化文件托管服务',
    'upload-list': '上传列表',
    'file-mode': '文件模式',
    'folder-mode': '文件夹模式',
    'sponsors-text': '本项目由',
    'sponsors-and': '和',
    'sponsors-suffix': '赞助',
  },
  'en': {
    'meta-title': 'IPFSBED - Decentralized IPFS File Hosting Service',
    'upload-title': 'Upload Files',
    'file-list': 'files',
    'drop-zone': 'Click / Paste / Drag & Drop to upload',
    'drop-zone-desc': 'Decentralized save and share files',
    'gateway-selector': 'Select Gateway:',
    'copy-link': 'Copy Link',
    'copy-share-link': 'Copy Share Link',
    'copy-all': 'Copy All',
    'select-all': 'Select All',
    'deselect-all-btn': 'Deselect All',
    'share-selected': 'Batch Share',
    'select-for-batch-sharing': 'Select for batch sharing',
    'batch-share-confirm-copy': 'Confirm & Copy Link',
    'batch-share-cancel': 'Cancel',
    'batch-share-link-copied': 'Batch share link copied to clipboard',
    'batch-encryption-failed': 'Batch encryption failed',
    'show-password': 'Show Password',
    'hide-password': 'Hide Password',
    'upload-success': 'Upload successful!',
    'upload-error': 'Upload failed!',
    'clipboard-empty': 'Clipboard is empty!',
    'clipboard-no-file': 'No image in clipboard!',
    'unsupported-type': 'Unsupported file type!',
    'file-too-large': 'File too large! Max {size}MB',
    'file-size': 'File size: {size}',
    'all-apis-failed': 'All APIs failed',
    'no-files-selected': 'No files selected',
    'selected-files-invalid': 'Selected files invalid',
    'copied-format': '{format} copied',
    'copied-all': 'All links copied',
    'encryption-failed': 'Encryption failed',
    'decryption-failed': 'Decryption failed',
    'accessing-file': 'Accessing file...',
    'file-will-be-public': 'File will be shared publicly',
    'download-button': 'Download File',
    'download-progress': 'Download Progress',
    'return-home': 'Return Home',
    'project-repo': 'Project Repository',
    'more-gateways': 'More Gateways',
    'copyright-text': '© {year} IPFSBED - Decentralized IPFS File Hosting Service',
    'upload-list': 'Upload List',
    'file-mode': 'File Mode',
    'folder-mode': 'Folder Mode',
    'sponsors-text': 'Sponsored by',
    'sponsors-and': 'and',
    'sponsors-suffix': '',
  }
};

// Translation function
function _t(key, replacements = {}) {
  // Get translation for current language or fallback to English
  const lang = translations[currentLang] || translations['en'];

  // Get the text or use the key if not found
  let text = lang[key] || translations['en'][key] || key;

  // 自动替换 {year} 为当前年份
  if (text.includes('{year}')) {
    let year;
    try {
      year = (new Date()).getFullYear();
      if (!year || isNaN(year)) year = 2025;
    } catch (e) {
      year = 2025;
    }
    text = text.replace('{year}', year);
  }

  // Replace any placeholders with actual values
  for (const placeholder in replacements) {
    text = text.replace(`{${placeholder}}`, replacements[placeholder]);
  }

  return text;
}

// Initialize language from localStorage or browser preference
function initializeLanguage() {
  // Try to get saved language preference
  let savedLang = localStorage.getItem('ipfsbed_lang');
  
  // If no saved preference, try to use browser language
  if (!savedLang) {
    const browserLang = navigator.language || navigator.userLanguage;
    // Check if we support the full browser language code
    if (translations[browserLang]) {
      savedLang = browserLang;
    } 
    // Check if we support just the primary language code
    else if (browserLang.includes('-')) {
      const primaryLang = browserLang.split('-')[0];
      if (translations[primaryLang]) {
        savedLang = primaryLang;
      }
    }
    
    // Default to English if no matching language found
    if (!savedLang) {
      savedLang = 'zh-CN'; // Chinese as default
    }
    
    // Save to localStorage
    localStorage.setItem('ipfsbed_lang', savedLang);
  }
  
  // Set current language
  currentLang = savedLang;
  return currentLang;
}

// Function to change language
function changeLanguage(lang) {
  if (translations[lang]) {
    currentLang = lang;
    localStorage.setItem('ipfsbed_lang', lang);
    updatePageLanguage();
  }
}

// Update all translatable elements on the page
function updatePageLanguage() {
  // Update elements with data-translate attribute
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    element.textContent = _t(key);
  });
  
  // Update elements with data-translate-placeholder attribute
  document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
    const key = element.getAttribute('data-translate-placeholder');
    element.placeholder = _t(key);
  });
  
  // Add specific page language updates if needed
  if (window.updateSharePageLanguage) {
    window.updateSharePageLanguage();
  }
  
  if (window.updateBatchSharePageLanguage) {
    window.updateBatchSharePageLanguage();
  }
}

// Immediately invoke initialization to set language on page load
initializeLanguage();
updatePageLanguage();
