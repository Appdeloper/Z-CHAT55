import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged,
    setPersistence,
    browserLocalPersistence,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signOut,
    updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
    getFirestore,
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    deleteDoc,
    serverTimestamp,
    onSnapshot,
    query,
    where,
    orderBy,
    limit,
    arrayUnion,
    arrayRemove,
    increment,
    runTransaction
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import {
    getStorage,
    ref as storageRef,
    uploadBytesResumable,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyAhZXEXJmLaxcnz7nTKuwhDhSuYQSKtBQs",
    authDomain: "z-chat11.firebaseapp.com",
    projectId: "z-chat11",
    storageBucket: "z-chat11.firebasestorage.app",
    messagingSenderId: "373379915510",
    appId: "1:373379915510:web:8b4b4502f6facb40c6d6d7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
await setPersistence(auth, browserLocalPersistence);

const $ = (id) => document.getElementById(id);
const els = {
    authView: $("auth-view"),
    appView: $("app-view"),
    authError: $("auth-error"),
    signinForm: $("signin-form"),
    signupForm: $("signup-form"),
    showSigninBtn: $("show-signin-btn"),
    showSignupBtn: $("show-signup-btn"),
    signinEmail: $("signin-email"),
    signinPassword: $("signin-password"),
    signupUsername: $("signup-username"),
    signupEmail: $("signup-email"),
    signupPassword: $("signup-password"),
    signupBio: $("signup-bio"),
    googleSigninBtn: $("google-signin-btn"),
    googleSignupBtn: $("google-signup-btn"),
    forgotPasswordBtn: $("forgot-password-btn"),
    sidebar: $("sidebar"),
    mobileOpenSidebar: $("mobile-open-sidebar"),
    mobileCloseSidebar: $("mobile-close-sidebar"),
    drawerOverlay: $("drawer-overlay"),
    profileAvatar: $("profile-avatar"),
    presenceDot: $("presence-dot"),
    profileUsername: $("profile-username"),
    profileStatus: $("profile-status"),
    workspaceAvatar: $("workspace-avatar"),
    workspaceName: $("workspace-name"),
    workspaceSubtitle: $("workspace-subtitle"),
    conversationList: $("conversation-list"),
    serverList: $("server-list"),
    friendRequestList: $("friend-request-list"),
    friendList: $("friend-list"),
    gameRoomList: $("game-room-list"),
    tournamentList: $("tournament-list"),
    studyGroupList: $("study-group-list"),
    subjectChannelList: $("subject-channel-list"),
    messageFeed: $("message-feed"),
    messageInput: $("message-input"),
    sendMessageBtn: $("send-message-btn"),
    mediaInput: $("media-input"),
    mediaBtn: $("media-btn"),
    emojiBtn: $("emoji-btn"),
    gifBtn: $("gif-btn"),
    scannerBtn: $("scanner-btn"),
    loadMoreBtn: $("load-more-btn"),
    typingIndicator: $("typing-indicator"),
    replyBanner: $("reply-banner"),
    uploadProgress: $("upload-progress"),
    mediaPreviewStrip: $("media-preview-strip"),
    liveMetrics: $("live-metrics"),
    notificationList: $("notification-list"),
    clearNotificationsBtn: $("clear-notifications-btn"),
    premiumBadge: $("premium-badge"),
    profileModal: $("profile-modal"),
    profileUsernameInput: $("profile-username-input"),
    profileBioInput: $("profile-bio-input"),
    profileAvatarInput: $("profile-avatar-input"),
    gamingUidInput: $("gaming-uid-input"),
    gamingRankInput: $("gaming-rank-input"),
    gamingStatsInput: $("gaming-stats-input"),
    saveProfileBtn: $("save-profile-btn"),
    openProfileBtn: $("open-profile-btn"),
    editProfileBtn: $("edit-profile-btn"),
    userSearchModal: $("user-search-modal"),
    openUserSearchBtn: $("open-user-search-btn"),
    userSearchInput: $("user-search-input"),
    userSearchResults: $("user-search-results"),
    creatorModal: $("creator-modal"),
    creatorTitle: $("creator-title"),
    creatorFields: $("creator-fields"),
    creatorSubmitBtn: $("creator-submit-btn"),
    newDirectChatBtn: $("new-direct-chat-btn"),
    newGroupBtn: $("new-group-btn"),
    newServerBtn: $("new-server-btn"),
    createRoomBtn: $("create-room-btn"),
    createTournamentBtn: $("create-tournament-btn"),
    createStudyGroupBtn: $("create-study-group-btn"),
    premiumBtn: $("premium-btn"),
    premiumModal: $("premium-modal"),
    paymentPreview: $("payment-preview"),
    markPaymentBtn: $("mark-payment-btn"),
    aiPanelBtn: $("ai-panel-btn"),
    aiModal: $("ai-modal"),
    aiModeSelect: $("ai-mode-select"),
    aiInput: $("ai-input"),
    openaiKeyInput: $("openai-key-input"),
    runAiBtn: $("run-ai-btn"),
    aiOutput: $("ai-output"),
    openTutorBtn: $("open-tutor-btn"),
    themeBtn: $("theme-btn"),
    themeModal: $("theme-modal"),
    emojiModal: $("emoji-modal"),
    emojiGrid: $("emoji-grid"),
    gifModal: $("gif-modal"),
    gifUrlInput: $("gif-url-input"),
    sendGifBtn: $("send-gif-btn"),
    voiceCallBtn: $("voice-call-btn"),
    videoCallBtn: $("video-call-btn"),
    renameGroupBtn: $("rename-group-btn"),
    openCallRoomBtn: $("open-call-room-btn"),
    joinTeamFinderBtn: $("join-team-finder-btn"),
    openStudyNotesBtn: $("open-study-notes-btn"),
    notificationsBtn: $("notifications-btn"),
    callModal: $("call-modal"),
    callTitle: $("call-title"),
    callPeerName: $("call-peer-name"),
    callStatusText: $("call-status-text"),
    callTimer: $("call-timer"),
    localVideo: $("local-video"),
    remoteVideo: $("remote-video"),
    acceptCallBtn: $("accept-call-btn"),
    rejectCallBtn: $("reject-call-btn"),
    toggleMicBtn: $("toggle-mic-btn"),
    toggleCameraBtn: $("toggle-camera-btn"),
    endCallBtn: $("end-call-btn"),
    closeCallBtn: $("close-call-btn"),
    smartOverview: $("smart-overview"),
    globalSearchInput: $("global-search-input"),
    logoutBtn: $("logout-btn")
};

const state = {
    user: null,
    profile: null,
    section: "chats",
    currentConversation: null,
    currentConversationData: null,
    messages: [],
    messagePageSize: 25,
    allConversations: [],
    servers: [],
    friends: [],
    requests: [],
    tournaments: [],
    gameRooms: [],
    studyGroups: [],
    notifications: [],
    selectedPlan: null,
    pendingUploads: [],
    replyTo: null,
    scanTargetMessageId: null,
    emojiList: [],
    call: {
        id: null,
        data: null,
        peerConnection: null,
        localStream: null,
        remoteStream: null,
        timer: null,
        startedAt: null,
        unsubscribers: []
    },
    unsubscribers: [],
    typingDebounce: null,
    theme: localStorage.getItem("zchat-theme") || "cyber-blue",
    openAiKey: localStorage.getItem("zchat-openai-key") || "",
    creatorPayload: null
};

const ICE_SERVERS = {
    iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" }
    ]
};

const THEMES = {
    "cyber-blue": { primary: "#32b8ff", secondary: "#7cf7ff", accent: "#1b8dff" },
    matrix: { primary: "#44ff66", secondary: "#a1ff75", accent: "#0f8d2d" },
    "cyber-pink": { primary: "#ff57ca", secondary: "#ffc1f2", accent: "#ff2a8c" },
    "gaming-red": { primary: "#ff4f5f", secondary: "#ffa682", accent: "#f51f44" },
    "study-blue": { primary: "#6d93ff", secondary: "#b4d1ff", accent: "#4269ff" }
};

const THEME_REQUIREMENTS = {
    "cyber-blue": "free",
    matrix: "49",
    "cyber-pink": "49",
    "gaming-red": "99",
    "study-blue": "99"
};

const DEBUG_MODE = true;

function debugLog(...args) {
    if (!DEBUG_MODE) return;
    console.log("[Z Chat]", ...args);
}

function toast(message, type = "info") {
    const node = document.createElement("div");
    node.className = `toast ${type}`;
    node.textContent = message;
    $("toast-root").append(node);
    setTimeout(() => node.remove(), 3200);
}

function setAuthMode(mode) {
    const signin = mode === "signin";
    els.signinForm.classList.toggle("hidden", !signin);
    els.signupForm.classList.toggle("hidden", signin);
    els.showSigninBtn.classList.toggle("active", signin);
    els.showSignupBtn.classList.toggle("active", !signin);
    els.authError.textContent = "";
}

function setTheme(themeName, options = {}) {
    const { skipGate = false } = options;
    const requiredPlan = THEME_REQUIREMENTS[themeName] || "free";
    if (!skipGate && requiredPlan !== "free" && state.profile && !hasPremiumTier(requiredPlan)) {
        toast(requiredPlan === "49" ? "Upgrade to Premium 49 to use this theme." : "Upgrade to Premium 99 to use this theme.", "error");
        openModal(els.premiumModal);
        return;
    }
    const theme = THEMES[themeName] || THEMES["cyber-blue"];
    state.theme = themeName;
    localStorage.setItem("zchat-theme", themeName);
    document.documentElement.style.setProperty("--primary", theme.primary);
    document.documentElement.style.setProperty("--secondary", theme.secondary);
    document.documentElement.style.setProperty("--accent", theme.accent);
}

function openModal(dialog) {
    if (!dialog.open) dialog.showModal();
}

function closeModal(dialog) {
    if (dialog.open) dialog.close();
}

function formatTime(value) {
    if (!value) return "";
    const date = value?.toDate ? value.toDate() : new Date(value);
    return new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit" }).format(date);
}

function formatDateTime(value) {
    if (!value) return "";
    const date = value?.toDate ? value.toDate() : new Date(value);
    return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit"
    }).format(date);
}

function setLoading(button, isLoading, label) {
    button.disabled = isLoading;
    button.dataset.label ||= button.textContent;
    button.textContent = isLoading ? label : button.dataset.label;
}

function initials(text = "Z") {
    return text
        .split(/[\s_-]+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((chunk) => chunk[0]?.toUpperCase() || "")
        .join("") || "Z";
}

function avatarUrl(profile) {
    return profile?.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.username || "Z Chat")}&background=0B111C&color=ffffff&rounded=true&bold=true&size=256`;
}

function getCurrentUserId() {
    return state.user?.uid;
}

function requireAuth() {
    if (!state.user) throw new Error("Please sign in first.");
}

function sanitize(text = "") {
    return text.replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char]));
}

function reportError(context, error) {
    const message = error?.message || String(error || "Unknown error");
    debugLog("Error", context, message);
    toast(`${context}: ${message}`, "error");
}

function setUploadProgress(message = "", visible = false) {
    els.uploadProgress.textContent = message;
    els.uploadProgress.classList.toggle("hidden", !visible);
}

function auditButtons() {
    const buttons = [...document.querySelectorAll("button")];
    debugLog("Button audit count", buttons.length);
    buttons.forEach((button) => {
        const label = button.id || button.textContent.trim() || "unnamed-button";
        debugLog("Button discovered", label, { type: button.type || "default" });
        if (!button.id && !button.dataset.plan && !button.dataset.theme && !button.value) {
            console.warn("[Z Chat] Button without ID or dataset:", button);
        }
    });
}

function normalizePlanValue(profile = state.profile) {
    if (!profile) return null;
    const raw = profile.plan || profile.premiumPlan || profile.premium?.plan || profile.premium?.amount || profile.premiumAmount || null;
    if (raw === null || raw === undefined || raw === "") return null;
    const digits = String(raw).match(/\d+/)?.[0];
    return digits || String(raw);
}

function isPremiumActive(profile = state.profile) {
    return Boolean(profile?.premium === true || profile?.premium?.active);
}

function hasPremiumTier(requiredPlan = "49", profile = state.profile) {
    const current = Number(normalizePlanValue(profile) || 0);
    return isPremiumActive(profile) && current >= Number(requiredPlan);
}

function ensurePremiumAccess({ plan = "49", message }) {
    if (hasPremiumTier(plan)) return true;
    toast(message || `Upgrade to Premium ${plan} to use this feature.`, "error");
    openPremiumModal();
    return false;
}

function scrollMessagesToBottom(force = false) {
    if (!force && els.messageFeed.scrollHeight - els.messageFeed.scrollTop - els.messageFeed.clientHeight > 160) return;
    els.messageFeed.scrollTop = els.messageFeed.scrollHeight;
}

function buildEmojiList() {
    if (state.emojiList.length) return;
    const ranges = [[0x1f600, 0x1f64f], [0x1f300, 0x1f5ff], [0x1f680, 0x1f6ff], [0x1f900, 0x1f9ff], [0x1fa70, 0x1faff], [0x2600, 0x26ff], [0x2700, 0x27bf]];
    for (const [start, end] of ranges) {
        for (let code = start; code <= end; code++) {
            try {
                const emoji = String.fromCodePoint(code);
                if (/\p{Emoji}/u.test(emoji)) state.emojiList.push(emoji);
            } catch {}
        }
    }
    state.emojiList = Array.from(new Set(state.emojiList)).slice(0, 1200);
}

function renderEmojiPicker() {
    buildEmojiList();
    const visibleEmojis = hasPremiumTier("49") ? state.emojiList : state.emojiList.slice(0, 60);
    els.emojiGrid.innerHTML = visibleEmojis.map((emoji) => `<button type="button" data-emoji="${emoji}">${emoji}</button>`).join("");
}

function setSection(section) {
    state.section = section;
    document.querySelectorAll(".nav-btn").forEach((btn) => btn.classList.toggle("active", btn.dataset.section === section));
    document.querySelectorAll(".sidebar-section").forEach((panel) => panel.classList.add("hidden"));
    $(`sidebar-${section}`).classList.remove("hidden");
}

function toggleSidebar(open) {
    const isMobile = window.innerWidth <= 900;
    if (!isMobile) return;
    els.sidebar.classList.toggle("open", open);
    els.drawerOverlay.classList.toggle("hidden", !open);
}

async function ensureUsernameAvailable(username, currentUid = null) {
    const handle = username.trim().toLowerCase();
    if (!/^[a-z0-9_.-]{3,20}$/.test(handle)) throw new Error("Username must be 3-20 chars and use letters, numbers, dot, underscore, or hyphen.");
    const usernameRef = doc(db, "usernames", handle);
    const snap = await getDoc(usernameRef);
    if (snap.exists() && snap.data().uid !== currentUid) throw new Error("Username is already taken.");
    return handle;
}

async function createOrUpdateUserProfile({ user, username, bio = "", avatarUrl: nextAvatarUrl = "", gameUid = "", rank = "", stats = "" }) {
    const handle = await ensureUsernameAvailable(username, user.uid);
    const userRef = doc(db, "users", user.uid);
    const currentSnap = await getDoc(userRef);
    const currentData = currentSnap.exists() ? currentSnap.data() : {};
    if (currentData.username && currentData.username !== handle) {
        await deleteDoc(doc(db, "usernames", currentData.username));
    }
    await setDoc(doc(db, "usernames", handle), { uid: user.uid, username: handle, updatedAt: serverTimestamp() });
    await setDoc(userRef, {
        uid: user.uid,
        email: user.email || "",
        username: handle,
        bio,
        avatarUrl: nextAvatarUrl || currentData.avatarUrl || "",
        premium: currentData.premium ?? false,
        premiumPlan: currentData.premiumPlan || normalizePlanValue(currentData),
        plan: currentData.plan || normalizePlanValue(currentData),
        activatedAt: currentData.activatedAt || null,
        premiumMeta: currentData.premiumMeta || null,
        premiumBadge: Boolean(currentData.premiumBadge || currentData.premium?.active),
        online: true,
        lastSeen: serverTimestamp(),
        gameProfile: { uid: gameUid, rank, stats },
        openAiConfigured: Boolean(state.openAiKey),
        updatedAt: serverTimestamp(),
        createdAt: currentData.createdAt || serverTimestamp()
    }, { merge: true });
    if (auth.currentUser && auth.currentUser.displayName !== handle) {
        await updateProfile(auth.currentUser, { displayName: handle, photoURL: nextAvatarUrl || currentData.avatarUrl || "" });
    }
}

async function uploadFile(path, file, onProgress) {
    const ref = storageRef(storage, path);
    const task = uploadBytesResumable(ref, file);
    return await new Promise((resolve, reject) => {
        task.on("state_changed", (snapshot) => {
            const progress = snapshot.totalBytes ? (snapshot.bytesTransferred / snapshot.totalBytes) * 100 : 0;
            onProgress?.(progress);
        }, reject, async () => resolve(await getDownloadURL(task.snapshot.ref)));
    });
}

function attachPendingMedia(files) {
    if (!files?.length) return;
    const next = [...files].map((file) => ({
        id: crypto.randomUUID(),
        file,
        preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : "",
        progress: 0
    }));
    state.pendingUploads.push(...next);
    renderMediaPreview();
}

function renderMediaPreview() {
    if (!state.pendingUploads.length) {
        els.mediaPreviewStrip.classList.add("hidden");
        els.mediaPreviewStrip.innerHTML = "";
        return;
    }
    els.mediaPreviewStrip.classList.remove("hidden");
    els.mediaPreviewStrip.innerHTML = state.pendingUploads.map((item) => `
        <div class="media-preview">
            ${item.preview ? `<img src="${item.preview}" alt="${sanitize(item.file.name)}">` : `<div class="note-card">${sanitize(item.file.name)}</div>`}
            <button type="button" data-remove-upload="${item.id}">x</button>
        </div>
    `).join("");
}

function updateWorkspaceHeader(conversation) {
    if (!conversation) {
        els.workspaceName.textContent = "Welcome to Z Chat";
        els.workspaceSubtitle.textContent = "Realtime messaging, gaming squads, study spaces, AI, and WebRTC calls";
        els.workspaceAvatar.textContent = "Z";
        els.renameGroupBtn.classList.add("hidden");
        return;
    }
    els.workspaceName.textContent = conversation.title || conversation.name || "Untitled";
    els.workspaceSubtitle.textContent = conversation.subtitle || conversation.description || `${conversation.type} channel`;
    els.workspaceAvatar.textContent = initials(conversation.title || conversation.name || "Z");
    els.renameGroupBtn.classList.toggle("hidden", !["group", "study", "gaming"].includes(conversation.type));
}

async function createNotification(recipientId, payload) {
    if (!recipientId || recipientId === getCurrentUserId()) return;
    await addDoc(collection(db, "notifications"), {
        recipientId,
        actorId: getCurrentUserId(),
        read: false,
        createdAt: serverTimestamp(),
        ...payload
    });
}

async function signUpWithEmail(formEvent) {
    formEvent.preventDefault();
    debugLog("Submit signup form");
    els.authError.textContent = "";
    setLoading(els.signupForm.querySelector(".primary-btn"), true, "Creating...");
    try {
        const username = await ensureUsernameAvailable(els.signupUsername.value);
        const cred = await createUserWithEmailAndPassword(auth, els.signupEmail.value.trim(), els.signupPassword.value);
        await createOrUpdateUserProfile({
            user: cred.user,
            username,
            bio: els.signupBio.value.trim()
        });
        toast("Account created.", "success");
    } catch (error) {
        els.authError.textContent = error.message;
    } finally {
        setLoading(els.signupForm.querySelector(".primary-btn"), false, "Create Account");
    }
}

async function signInWithEmail(formEvent) {
    formEvent.preventDefault();
    debugLog("Submit signin form");
    els.authError.textContent = "";
    setLoading(els.signinForm.querySelector(".primary-btn"), true, "Signing in...");
    try {
        await signInWithEmailAndPassword(auth, els.signinEmail.value.trim(), els.signinPassword.value);
    } catch (error) {
        els.authError.textContent = error.message;
    } finally {
        setLoading(els.signinForm.querySelector(".primary-btn"), false, "Sign In");
    }
}

async function signInWithGoogle(mode = "signin") {
    debugLog("Google auth click", mode);
    els.authError.textContent = "";
    try {
        const provider = new GoogleAuthProvider();
        const { user } = await signInWithPopup(auth, provider);
        const userRef = doc(db, "users", user.uid);
        const existing = await getDoc(userRef);
        if (!existing.exists()) {
            const base = (user.displayName || user.email?.split("@")[0] || `pilot_${user.uid.slice(0, 6)}`).toLowerCase().replace(/\s+/g, "_");
            await createOrUpdateUserProfile({
                user,
                username: await ensureUsernameAvailable(base).catch(async () => await ensureUsernameAvailable(`${base}_${user.uid.slice(0, 4)}`)),
                bio: mode === "signup" ? "Ready to connect in Z Chat." : ""
            });
        } else {
            await updateDoc(userRef, { online: true, lastSeen: serverTimestamp(), updatedAt: serverTimestamp() });
        }
    } catch (error) {
        els.authError.textContent = error.message;
    }
}

async function resetPassword() {
    debugLog("Password reset requested");
    const email = els.signinEmail.value.trim();
    if (!email) {
        els.authError.textContent = "Enter your email first.";
        return;
    }
    try {
        await sendPasswordResetEmail(auth, email);
        toast("Password reset email sent.", "success");
    } catch (error) {
        els.authError.textContent = error.message;
    }
}

async function loadProfile() {
    requireAuth();
    const snap = await getDoc(doc(db, "users", getCurrentUserId()));
    if (!snap.exists()) throw new Error("Profile not found.");
    state.profile = snap.data();
    applyProfileToUI(state.profile);
}

function applyProfileToUI(profile) {
    if (!profile) return;
    const planValue = normalizePlanValue(profile);
    els.profileAvatar.src = avatarUrl(profile);
    els.profileUsername.textContent = profile.username;
    els.profileStatus.textContent = `${profile.online ? "Online" : `Last seen ${formatDateTime(profile.lastSeen) || "recently"}`} • ${profile.bio || "No status set"}${isPremiumActive(profile) ? ` • Premium ${planValue}` : ""}`;
    els.workspaceAvatar.textContent = initials(profile.username);
    els.premiumBadge.classList.toggle("hidden", !hasPremiumTier("99", profile));
    els.premiumBadge.textContent = hasPremiumTier("99", profile) ? "PREMIUM 99" : "PREMIUM";
    els.presenceDot.style.background = profile.online ? "var(--success)" : "var(--muted)";
    els.presenceDot.style.boxShadow = profile.online ? "0 0 18px rgba(56, 255, 144, 0.8)" : "0 0 0 rgba(0,0,0,0)";
    els.profileUsernameInput.value = profile.username || "";
    els.profileBioInput.value = profile.bio || "";
    els.gamingUidInput.value = profile.gameProfile?.uid || "";
    els.gamingRankInput.value = profile.gameProfile?.rank || "";
    els.gamingStatsInput.value = profile.gameProfile?.stats || "";
}

function clearRealtime() {
    state.unsubscribers.forEach((fn) => fn?.());
    state.unsubscribers = [];
}

function subscribeBaseData() {
    clearRealtime();
    const uid = getCurrentUserId();

    state.unsubscribers.push(onSnapshot(doc(db, "users", uid), (snap) => {
        if (!snap.exists()) return;
        state.profile = snap.data();
        applyProfileToUI(state.profile);
    }));

    state.unsubscribers.push(onSnapshot(
        query(collection(db, "conversations"), where("memberIds", "array-contains", uid)),
        (snap) => {
            state.allConversations = snap.docs
                .map((d) => ({ id: d.id, ...d.data() }))
                .sort((a, b) => (b.updatedAt?.seconds || 0) - (a.updatedAt?.seconds || 0));
            renderConversationList();
            if (state.currentConversation && !state.allConversations.some((item) => item.id === state.currentConversation)) {
                selectConversation(null);
            }
        }
    ));

    state.unsubscribers.push(onSnapshot(
        query(collection(db, "servers"), where("memberIds", "array-contains", uid)),
        (snap) => {
            state.servers = snap.docs
                .map((d) => ({ id: d.id, ...d.data() }))
                .sort((a, b) => (b.updatedAt?.seconds || 0) - (a.updatedAt?.seconds || 0));
            renderServers();
        }
    ));

    state.unsubscribers.push(onSnapshot(
        query(collection(db, "friendRequests"), where("recipientId", "==", uid)),
        (snap) => {
            state.requests = snap.docs
                .map((d) => ({ id: d.id, ...d.data() }))
                .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
            renderRequests();
        }
    ));

    state.unsubscribers.push(onSnapshot(
        query(collection(db, "friends"), where("memberIds", "array-contains", uid)),
        async (snap) => {
            const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            const friendIds = docs.flatMap((entry) => entry.memberIds.filter((id) => id !== uid));
            const profiles = await Promise.all(friendIds.map((id) => getDoc(doc(db, "users", id))));
            state.friends = profiles.filter((item) => item.exists()).map((item) => item.data());
            renderFriends();
            renderMetrics();
        }
    ));

    state.unsubscribers.push(onSnapshot(
        query(collection(db, "gameRooms"), orderBy("updatedAt", "desc"), limit(20)),
        (snap) => {
            state.gameRooms = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            renderGameRooms();
        }
    ));

    state.unsubscribers.push(onSnapshot(
        query(collection(db, "tournaments"), orderBy("updatedAt", "desc"), limit(20)),
        (snap) => {
            state.tournaments = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            renderTournaments();
        }
    ));

    state.unsubscribers.push(onSnapshot(
        query(collection(db, "studyGroups"), orderBy("updatedAt", "desc"), limit(20)),
        (snap) => {
            state.studyGroups = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            renderStudyGroups();
        }
    ));

    state.unsubscribers.push(onSnapshot(
        query(collection(db, "notifications"), where("recipientId", "==", uid), limit(30)),
        (snap) => {
            state.notifications = snap.docs
                .map((d) => ({ id: d.id, ...d.data() }))
                .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
            renderNotifications();
        }
    ));

    state.unsubscribers.push(onSnapshot(
        query(collection(db, "calls"), where("calleeId", "==", uid), limit(10)),
        (snap) => {
            const callDoc = snap.docs
                .map((d) => ({ id: d.id, ...d.data() }))
                .filter((call) => ["ringing", "answered", "ongoing"].includes(call.status))
                .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))[0];
            if (!callDoc) return;
            if (state.call.id === callDoc.id) return;
            incomingCall(callDoc).catch((error) => toast(error.message, "error"));
        }
    ));
}

function renderConversationList(filter = "") {
    const q = filter.toLowerCase();
    const items = state.allConversations.filter((conversation) => {
        const haystack = `${conversation.title || ""} ${conversation.description || ""}`.toLowerCase();
        return haystack.includes(q);
    });
    els.conversationList.innerHTML = items.map((conversation) => `
        <button class="list-card conversation-item" data-conversation-id="${conversation.id}">
            <strong>${sanitize(conversation.title || "Conversation")}</strong>
            <span class="subtle">${sanitize(conversation.lastMessagePreview || conversation.description || conversation.type)}</span>
            <small>${formatDateTime(conversation.updatedAt)}</small>
        </button>
    `).join("") || `<div class="note-card">No conversations yet.</div>`;
}

function renderServers() {
    els.serverList.innerHTML = state.servers.map((server) => `
        <div class="server-node">
            <div>
                <strong>${sanitize(server.name)}</strong>
                <small>${sanitize(server.description || "Community server")}</small>
            </div>
            <div class="channel-row">
                ${(server.channels || []).map((channel) => `
                    <button class="channel-pill" data-channel-conversation="${channel.conversationId}">
                        #${sanitize(channel.name)}
                    </button>
                `).join("")}
            </div>
        </div>
    `).join("") || `<div class="note-card">No servers yet.</div>`;
}

function renderRequests() {
    els.friendRequestList.innerHTML = state.requests.map((req) => `
        <div class="user-card">
            <strong>${sanitize(req.senderUsername || "Unknown")}</strong>
            <small>${formatDateTime(req.createdAt)}</small>
            <div class="section-actions">
                <button class="tiny-btn" data-accept-request="${req.id}">Accept</button>
                <button class="tiny-btn" data-reject-request="${req.id}">Reject</button>
            </div>
        </div>
    `).join("") || `<div class="note-card">No pending friend requests.</div>`;
}

function renderFriends(filter = "") {
    const q = filter.toLowerCase();
    const items = state.friends.filter((friend) => `${friend.username} ${friend.bio || ""}`.toLowerCase().includes(q));
    els.friendList.innerHTML = items.map((friend) => `
        <div class="user-card">
            <strong>${sanitize(friend.username)}</strong>
            <small>${sanitize(friend.bio || "No status")}</small>
            <div class="section-actions">
                <button class="tiny-btn" data-start-dm="${friend.uid}">Chat</button>
                <button class="tiny-btn" data-remove-friend="${friend.uid}">Remove</button>
            </div>
        </div>
    `).join("") || `<div class="note-card">No friends yet.</div>`;
}

function renderGameRooms(filter = "") {
    const q = filter.toLowerCase();
    const items = state.gameRooms.filter((room) => `${room.title} ${room.game} ${room.mode}`.toLowerCase().includes(q));
    els.gameRoomList.innerHTML = items.map((room) => `
        <div class="list-card">
            <strong>${sanitize(room.title)}</strong>
            <span class="subtle">${sanitize(room.game)} • ${sanitize(room.mode)} • ${room.slotsFilled || 0}/${room.maxPlayers || 4}</span>
            <div class="section-actions">
                <button class="tiny-btn" data-join-room="${room.id}">Join Room</button>
                <button class="tiny-btn" data-open-room-chat="${room.conversationId}">Open Chat</button>
            </div>
        </div>
    `).join("") || `<div class="note-card">No game rooms.</div>`;
}

function renderTournaments(filter = "") {
    const q = filter.toLowerCase();
    const items = state.tournaments.filter((tour) => `${tour.title} ${tour.game}`.toLowerCase().includes(q));
    els.tournamentList.innerHTML = items.map((tour) => `
        <div class="list-card">
            <strong>${sanitize(tour.title)}</strong>
            <span class="subtle">${sanitize(tour.game)} • Entry ₹${tour.entryFee} • Prize ₹${tour.prizePool}</span>
            <div class="section-actions">
                <button class="tiny-btn" data-join-tournament="${tour.id}">Join</button>
            </div>
        </div>
    `).join("") || `<div class="note-card">No tournaments.</div>`;
}

function renderStudyGroups(filter = "") {
    const q = filter.toLowerCase();
    const items = state.studyGroups.filter((group) => `${group.name} ${group.subjects?.join(" ") || ""}`.toLowerCase().includes(q));
    els.studyGroupList.innerHTML = items.map((group) => `
        <div class="list-card">
            <strong>${sanitize(group.name)}</strong>
            <span class="subtle">${sanitize((group.subjects || []).join(", "))}</span>
            <div class="section-actions">
                <button class="tiny-btn" data-join-study="${group.id}">Join</button>
                <button class="tiny-btn" data-open-study-chat="${group.conversationId}">Open</button>
            </div>
        </div>
    `).join("") || `<div class="note-card">No study groups.</div>`;
    els.subjectChannelList.innerHTML = ["Math", "Science", "English"].map((subject) => `
        <button class="channel-pill" data-open-subject="${subject.toLowerCase()}">#${subject.toLowerCase()}</button>
    `).join("");
}

function renderNotifications() {
    els.notificationList.innerHTML = state.notifications.map((item) => `
        <div class="notification-item">
            <div>
                <strong>${sanitize(item.title || item.type || "Update")}</strong>
                <small>${sanitize(item.body || "")}</small>
            </div>
            <small>${formatTime(item.createdAt)}</small>
        </div>
    `).join("") || `<div class="note-card">No notifications.</div>`;
}

function renderMetrics() {
    const premium = hasPremiumTier("99") ? "99 Plan" : hasPremiumTier("49") ? "49 Plan" : "Free";
    const rooms = state.gameRooms.filter((room) => room.playerIds?.includes(getCurrentUserId())).length;
    const cards = [
        { title: "Friends", value: String(state.friends.length) },
        { title: "Conversations", value: String(state.allConversations.length) },
        { title: "Gaming Rooms", value: String(rooms) },
        { title: "Premium", value: premium }
    ];
    els.liveMetrics.innerHTML = cards.map((card) => `
        <div class="metric-card">
            <strong>${sanitize(card.value)}</strong>
            <span>${sanitize(card.title)}</span>
        </div>
    `).join("");
}

function renderOverview(conversation) {
    if (!conversation) {
        els.smartOverview.innerHTML = `
            <div class="overview-card">
                <div>
                    <strong>Super app ready</strong>
                    <span>Open a DM, server channel, gaming room, or study group to start collaborating.</span>
                </div>
            </div>
        `;
        return;
    }
    const labels = [
        `Type: ${conversation.type}`,
        conversation.members?.length ? `Members: ${conversation.members.length}` : "",
        conversation.role ? `Role: ${conversation.role}` : "",
        conversation.permissions?.join(", ")
    ].filter(Boolean).join(" • ");
    els.smartOverview.innerHTML = `
        <div class="overview-card">
            <div>
                <strong>${sanitize(conversation.title || conversation.name)}</strong>
                <span>${sanitize(labels || conversation.description || "Realtime channel")}</span>
            </div>
        </div>
    `;
}

async function ensureDirectConversation(friendUid) {
    const uid = getCurrentUserId();
    const ids = [uid, friendUid].sort();
    const handle = ids.join("_");
    const conversationRef = doc(db, "conversations", `direct_${handle}`);
    const existing = await getDoc(conversationRef);
    if (existing.exists()) return existing.id;
    const friendSnap = await getDoc(doc(db, "users", friendUid));
    const friend = friendSnap.data();
    await setDoc(conversationRef, {
        type: "direct",
        memberHash: handle,
        memberIds: ids,
        title: friend?.username || "Direct Message",
        description: friend?.bio || "Private chat",
        lastMessagePreview: "Conversation started",
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp()
    }, { merge: true });
    return conversationRef.id;
}

async function selectConversation(conversationId) {
    state.messages = [];
    state.currentConversation = conversationId;
    if (!conversationId) {
        state.currentConversationData = null;
        els.messageFeed.innerHTML = `<div class="note-card">Choose a chat, server channel, room, or study group.</div>`;
        renderOverview(null);
        updateWorkspaceHeader(null);
        return;
    }
    const snap = await getDoc(doc(db, "conversations", conversationId));
    if (!snap.exists()) {
        toast("Conversation not found.", "error");
        return;
    }
    state.currentConversationData = { id: snap.id, ...snap.data() };
    renderOverview(state.currentConversationData);
    updateWorkspaceHeader(state.currentConversationData);
    subscribeMessages();
}

function renderMessageMedia(media = []) {
    if (!media.length) return "";
    const html = media.map((item) => {
        if (item.type.startsWith("image/") || item.kind === "gif") {
            return `<img src="${item.url}" alt="${sanitize(item.name || "Shared media")}">`;
        }
        return `<embed src="${item.url}" type="${item.type || "application/pdf"}">`;
    }).join("");
    return `<div class="message-media-grid">${html}</div>`;
}

function messageStatus(message) {
    const uid = getCurrentUserId();
    if (message.senderId !== uid) return "";
    if (message.seenBy?.length > 1) return "Seen";
    if (message.deliveredTo?.length > 1) return "Delivered";
    return "Sent";
}

function renderMessages() {
    if (!state.currentConversationData) return;
    if (!state.messages.length) {
        els.messageFeed.innerHTML = `<div class="note-card">No messages yet. Start the conversation.</div>`;
        return;
    }
    els.messageFeed.innerHTML = state.messages.map((message) => {
        const own = message.senderId === getCurrentUserId();
        const reactionEntries = Object.entries(message.reactions || {});
        return `
            <div class="message-row">
                <div class="message-avatar">
                    <img src="${avatarUrl({ avatarUrl: message.senderAvatar, username: message.senderUsername })}" alt="${sanitize(message.senderUsername || "Avatar")}">
                </div>
                <div class="message-card ${own ? "own" : ""}">
                    <div class="message-meta">
                        <strong>${sanitize(message.senderUsername || "Unknown")}</strong>
                        <small>${formatDateTime(message.createdAt)}</small>
                    </div>
                    ${message.replyTo ? `<small class="subtle">Replying to ${sanitize(message.replyTo.senderUsername)}: ${sanitize(message.replyTo.text?.slice(0, 80) || "media")}</small>` : ""}
                    <p>${sanitize(message.text || "")}</p>
                    ${renderMessageMedia(message.media || [])}
                    ${message.scanResult ? `<div class="note-card"><strong>${sanitize(message.scanResult.verdict)}</strong><small>${sanitize(message.scanResult.summary || "")}</small></div>` : ""}
                    <div class="message-foot">
                        <span class="status-pill">${sanitize(messageStatus(message))}</span>
                        ${message.editedAt ? `<span class="status-pill">Edited</span>` : ""}
                        <button class="pill-btn" data-reply="${message.id}">Reply</button>
                        <button class="pill-btn" data-scan-message="${message.id}">Scan</button>
                        ${own ? `<button class="pill-btn" data-edit="${message.id}">Edit</button><button class="pill-btn" data-delete="${message.id}">Delete</button>` : ""}
                        <button class="reaction-btn" data-react="${message.id}" data-emoji="👍">👍 ${(message.reactions?.["👍"] || []).length || ""}</button>
                        <button class="reaction-btn" data-react="${message.id}" data-emoji="🔥">🔥 ${(message.reactions?.["🔥"] || []).length || ""}</button>
                        <button class="reaction-btn" data-react="${message.id}" data-emoji="😂">😂 ${(message.reactions?.["😂"] || []).length || ""}</button>
                        ${reactionEntries.length ? `<small>${reactionEntries.map(([emoji, users]) => `${emoji} ${users.length}`).join(" • ")}</small>` : ""}
                    </div>
                </div>
            </div>
        `;
    }).join("");
    scrollMessagesToBottom();
}

function subscribeMessages() {
    const persistent = [];
    state.unsubscribers.forEach((item) => {
        if (item.scope === "messages") {
            item();
            return;
        }
        persistent.push(item);
    });
    state.unsubscribers = persistent;
    const conversationId = state.currentConversation;
    if (!conversationId) return;

    const messagesQuery = query(collection(db, "conversations", conversationId, "messages"), orderBy("createdAt", "desc"), limit(state.messagePageSize));

    const unsubscribeMessages = onSnapshot(messagesQuery, async (snap) => {
        state.messages = snap.docs.map((d) => ({ id: d.id, ...d.data() })).reverse();
        els.loadMoreBtn.classList.toggle("hidden", snap.docs.length < state.messagePageSize);
        renderMessages();
        await markMessagesSeen();
    });
    unsubscribeMessages.scope = "messages";
    state.unsubscribers.push(unsubscribeMessages);

    const unsubscribeConversation = onSnapshot(doc(db, "conversations", conversationId), (snap) => {
        if (!snap.exists()) return;
        state.currentConversationData = { id: snap.id, ...snap.data() };
        const typingUsers = Object.entries(state.currentConversationData.typing || {})
            .filter(([uid, active]) => uid !== getCurrentUserId() && active)
            .map(([uid]) => uid);
        els.typingIndicator.classList.toggle("hidden", !typingUsers.length);
        els.typingIndicator.textContent = typingUsers.length ? "Someone is typing..." : "";
        renderOverview(state.currentConversationData);
    });
    unsubscribeConversation.scope = "messages";
    state.unsubscribers.push(unsubscribeConversation);
}

async function loadOlderMessages() {
    state.messagePageSize += 25;
    subscribeMessages();
}

async function markMessagesSeen() {
    if (!state.currentConversation) return;
    const uid = getCurrentUserId();
    const unseen = state.messages.filter((message) => message.senderId !== uid && !(message.seenBy || []).includes(uid));
    await Promise.all(unseen.map((message) =>
        updateDoc(doc(db, "conversations", state.currentConversation, "messages", message.id), {
            deliveredTo: arrayUnion(uid),
            seenBy: arrayUnion(uid)
        })
    )).catch(() => {});
}

async function sendTypingState(active) {
    if (!state.currentConversation) return;
    await updateDoc(doc(db, "conversations", state.currentConversation), {
        [`typing.${getCurrentUserId()}`]: active,
        updatedAt: serverTimestamp()
    }).catch(() => {});
}

async function uploadPendingMedia() {
    if (!state.pendingUploads.length) return [];
    if (!hasPremiumTier("49") && state.pendingUploads.length > 1) {
        throw new Error("Upgrade to Premium 49 for unlimited image uploads.");
    }
    const base = `chat-media/${getCurrentUserId()}/${Date.now()}`;
    const media = [];
    for (let index = 0; index < state.pendingUploads.length; index++) {
        const item = state.pendingUploads[index];
        setUploadProgress(`Uploading ${item.file.name}... 0%`, true);
        const url = await uploadFile(`${base}/${item.file.name}`, item.file, (progress) => {
            const rounded = Math.round(progress);
            setUploadProgress(`Uploading ${item.file.name}... ${rounded}%`, true);
        });
        media.push({
            url,
            name: item.file.name,
            type: item.file.type || "application/octet-stream",
            kind: item.file.type.startsWith("image/") ? "image" : "file"
        });
        setUploadProgress(`Uploaded ${index + 1} of ${state.pendingUploads.length}`, true);
    }
    state.pendingUploads.forEach((item) => item.preview && URL.revokeObjectURL(item.preview));
    state.pendingUploads = [];
    renderMediaPreview();
    setUploadProgress("", false);
    return media;
}

async function sendMessage({ text = "", media = [], type = "text" }) {
    requireAuth();
    if (!state.currentConversation) throw new Error("Choose a conversation first.");
    debugLog("Send message", { type, hasText: Boolean(text.trim()), mediaCount: media.length, conversationId: state.currentConversation });
    const body = text.trim();
    if (!body && !media.length) return;

    const profile = state.profile;
    const conversationRef = doc(db, "conversations", state.currentConversation);
    await addDoc(collection(db, "conversations", state.currentConversation, "messages"), {
        senderId: getCurrentUserId(),
        senderUsername: profile.username,
        senderAvatar: profile.avatarUrl || "",
        text: body,
        media,
        type,
        replyTo: state.replyTo,
        deliveredTo: [getCurrentUserId()],
        seenBy: [getCurrentUserId()],
        createdAt: serverTimestamp(),
        editedAt: null,
        deleted: false,
        reactions: {}
    });
    await updateDoc(conversationRef, {
        lastMessagePreview: body || `${media.length} attachment(s)`,
        updatedAt: serverTimestamp(),
        typing: { ...(state.currentConversationData?.typing || {}), [getCurrentUserId()]: false }
    });
    const others = state.currentConversationData.memberIds.filter((id) => id !== getCurrentUserId());
    await Promise.all(others.map((recipientId) => createNotification(recipientId, {
        type: "message",
        title: `${profile.username} sent a message`,
        body: body || "Shared media",
        conversationId: state.currentConversation
    })));
    els.messageInput.value = "";
    state.replyTo = null;
    renderReplyBanner();
}

function renderReplyBanner() {
    els.replyBanner.classList.toggle("hidden", !state.replyTo);
    els.replyBanner.innerHTML = state.replyTo
        ? `Replying to ${sanitize(state.replyTo.senderUsername)}: ${sanitize(state.replyTo.text?.slice(0, 80) || "media")} <button class="tiny-btn" data-cancel-reply="1">Cancel</button>`
        : "";
}

async function editMessage(messageId) {
    const message = state.messages.find((item) => item.id === messageId);
    if (!message) return;
    const nextText = window.prompt("Edit message", message.text || "");
    if (nextText === null) return;
    await updateDoc(doc(db, "conversations", state.currentConversation, "messages", messageId), {
        text: nextText.trim(),
        editedAt: serverTimestamp()
    });
}

async function deleteMessageAction(messageId) {
    if (!window.confirm("Delete this message?")) return;
    await updateDoc(doc(db, "conversations", state.currentConversation, "messages", messageId), {
        text: "Message deleted",
        media: [],
        deleted: true,
        editedAt: serverTimestamp()
    });
}

async function toggleReaction(messageId, emoji) {
    const message = state.messages.find((item) => item.id === messageId);
    if (!message) return;
    const users = message.reactions?.[emoji] || [];
    const hasReacted = users.includes(getCurrentUserId());
    await updateDoc(doc(db, "conversations", state.currentConversation, "messages", messageId), {
        [`reactions.${emoji}`]: hasReacted ? arrayRemove(getCurrentUserId()) : arrayUnion(getCurrentUserId())
    });
}

async function startUserSearch() {
    const search = els.userSearchInput.value.trim().toLowerCase();
    if (!search) return;
    const all = await getDocs(query(collection(db, "users"), orderBy("username"), limit(20)));
    const results = all.docs.map((d) => d.data()).filter((user) => user.username.includes(search) && user.uid !== getCurrentUserId());
    els.userSearchResults.innerHTML = results.map((user) => `
        <div class="user-card">
            <strong>${sanitize(user.username)}</strong>
            <small>${sanitize(user.bio || "No status")}</small>
            <div class="section-actions">
                <button class="tiny-btn" data-send-request="${user.uid}" data-username="${sanitize(user.username)}">Add Friend</button>
                <button class="tiny-btn" data-start-dm="${user.uid}">Message</button>
            </div>
        </div>
    `).join("") || `<div class="note-card">No matches.</div>`;
}

async function sendFriendRequest(targetUid, targetUsername) {
    const uid = getCurrentUserId();
    const existing = await getDocs(query(collection(db, "friendRequests"), where("senderId", "==", uid), where("recipientId", "==", targetUid), limit(1)));
    if (!existing.empty) {
        toast("Request already sent.");
        return;
    }
    await addDoc(collection(db, "friendRequests"), {
        senderId: uid,
        senderUsername: state.profile.username,
        recipientId: targetUid,
        recipientUsername: targetUsername,
        createdAt: serverTimestamp()
    });
    await createNotification(targetUid, {
        type: "friend-request",
        title: "New friend request",
        body: `${state.profile.username} wants to connect.`
    });
    toast("Friend request sent.", "success");
}

async function acceptFriendRequest(requestId) {
    const req = state.requests.find((item) => item.id === requestId);
    if (!req) return;
    const pair = [req.senderId, req.recipientId].sort().join("_");
    await setDoc(doc(db, "friends", pair), {
        memberIds: [req.senderId, req.recipientId],
        updatedAt: serverTimestamp()
    }, { merge: true });
    await deleteDoc(doc(db, "friendRequests", requestId));
    await createNotification(req.senderId, {
        type: "friend-accepted",
        title: "Friend request accepted",
        body: `${state.profile.username} accepted your request.`
    });
    toast("Friend added.", "success");
}

async function rejectFriendRequest(requestId) {
    await deleteDoc(doc(db, "friendRequests", requestId));
    toast("Request removed.");
}

async function removeFriend(targetUid) {
    const pair = [targetUid, getCurrentUserId()].sort().join("_");
    await deleteDoc(doc(db, "friends", pair));
    toast("Friend removed.");
}

function launchCreator(type) {
    if (type === "group" && !ensurePremiumAccess({ plan: "49", message: "Upgrade to Premium 49 to create groups." })) return;
    if (["room", "tournament"].includes(type) && !ensurePremiumAccess({ plan: "99", message: "Upgrade to Premium 99 to access gaming rooms and tournaments." })) return;
    const defs = {
        group: { title: "Create Group", fields: [["name", "Group name"], ["description", "Group description"], ["members", "Member usernames, comma separated"]] },
        server: { title: "Create Server", fields: [["name", "Server name"], ["description", "Server description"], ["icon", "Server icon URL (optional)"]] },
        room: { title: "Create Game Room", fields: [["title", "Room title"], ["game", "Game name"], ["mode", "Mode / squad type"], ["maxPlayers", "Max players"]] },
        tournament: { title: "Create Tournament", fields: [["title", "Tournament title"], ["game", "Game name"], ["entryFee", "Entry fee"], ["prizePool", "Prize pool"]] },
        study: { title: "Create Study Group", fields: [["name", "Group name"], ["subjects", "Subjects, comma separated"], ["description", "Description"]] }
    };
    state.creatorPayload = { type };
    const config = defs[type];
    els.creatorTitle.textContent = config.title;
    els.creatorFields.innerHTML = config.fields.map(([key, label]) => `
        <label>
            <span>${label}</span>
            <input data-creator-field="${key}" type="text">
        </label>
    `).join("");
    openModal(els.creatorModal);
}

async function submitCreator() {
    const inputs = [...els.creatorFields.querySelectorAll("[data-creator-field]")];
    const values = Object.fromEntries(inputs.map((input) => [input.dataset.creatorField, input.value.trim()]));
    const uid = getCurrentUserId();

    if (state.creatorPayload.type === "group") {
        const memberIds = [uid];
        const usernames = values.members.split(",").map((item) => item.trim().toLowerCase()).filter(Boolean);
        const lookups = await Promise.all(usernames.map((name) => getDoc(doc(db, "usernames", name))));
        lookups.forEach((snap) => snap.exists() && memberIds.push(snap.data().uid));
        const conversation = await addDoc(collection(db, "conversations"), {
            type: "group",
            title: values.name,
            description: values.description,
            memberIds: [...new Set(memberIds)],
            updatedAt: serverTimestamp(),
            createdAt: serverTimestamp(),
            lastMessagePreview: "Group created",
            permissions: ["chat", "media", "reply", "call"]
        });
        await addDoc(collection(db, "groups"), {
            name: values.name,
            description: values.description,
            ownerId: uid,
            memberIds: [...new Set(memberIds)],
            conversationId: conversation.id,
            updatedAt: serverTimestamp(),
            createdAt: serverTimestamp()
        });
    }

    if (state.creatorPayload.type === "server") {
        const baseChannels = ["general", "chat", "voice"];
        const serverRef = doc(collection(db, "servers"));
        const serverChannels = [];
        for (const channel of baseChannels) {
            const convo = await addDoc(collection(db, "conversations"), {
                type: "server",
                title: `${values.name} • #${channel}`,
                description: channel === "voice" ? "Voice room and stage chat" : `${channel} channel`,
                memberIds: [uid],
                serverId: serverRef.id,
                channelName: channel,
                roleMap: { [uid]: "Admin" },
                permissions: channel === "voice" ? ["voice", "media", "chat"] : ["chat", "media", "reply", "call"],
                updatedAt: serverTimestamp(),
                createdAt: serverTimestamp(),
                lastMessagePreview: `${channel} channel created`
            });
            serverChannels.push({ name: channel, type: channel === "voice" ? "voice" : "text", conversationId: convo.id });
        }
        await setDoc(serverRef, {
            name: values.name,
            description: values.description,
            iconUrl: values.icon,
            ownerId: uid,
            memberIds: [uid],
            channels: serverChannels,
            roles: ["Admin", "Moderator", "Member"],
            updatedAt: serverTimestamp(),
            createdAt: serverTimestamp()
        });
    }

    if (state.creatorPayload.type === "room") {
        const conversation = await addDoc(collection(db, "conversations"), {
            type: "gaming",
            title: values.title,
            description: `${values.game} • ${values.mode}`,
            memberIds: [uid],
            updatedAt: serverTimestamp(),
            createdAt: serverTimestamp(),
            lastMessagePreview: "Room created"
        });
        await addDoc(collection(db, "gameRooms"), {
            title: values.title,
            game: values.game,
            mode: values.mode,
            maxPlayers: Number(values.maxPlayers || 4),
            slotsFilled: 1,
            ownerId: uid,
            playerIds: [uid],
            conversationId: conversation.id,
            updatedAt: serverTimestamp(),
            createdAt: serverTimestamp()
        });
    }

    if (state.creatorPayload.type === "tournament") {
        await addDoc(collection(db, "tournaments"), {
            title: values.title,
            game: values.game,
            entryFee: Number(values.entryFee || 0),
            prizePool: Number(values.prizePool || 0),
            ownerId: uid,
            playerIds: [uid],
            updatedAt: serverTimestamp(),
            createdAt: serverTimestamp()
        });
    }

    if (state.creatorPayload.type === "study") {
        const subjects = values.subjects.split(",").map((item) => item.trim()).filter(Boolean);
        const conversation = await addDoc(collection(db, "conversations"), {
            type: "study",
            title: values.name,
            description: values.description,
            memberIds: [uid],
            subjects,
            updatedAt: serverTimestamp(),
            createdAt: serverTimestamp(),
            lastMessagePreview: "Study group created"
        });
        await addDoc(collection(db, "studyGroups"), {
            name: values.name,
            description: values.description,
            subjects,
            ownerId: uid,
            memberIds: [uid],
            conversationId: conversation.id,
            updatedAt: serverTimestamp(),
            createdAt: serverTimestamp()
        });
    }

    closeModal(els.creatorModal);
    toast("Created successfully.", "success");
}

async function joinGameRoom(roomId) {
    const roomRef = doc(db, "gameRooms", roomId);
    await runTransaction(db, async (transaction) => {
        const snap = await transaction.get(roomRef);
        if (!snap.exists()) throw new Error("Room missing.");
        const room = snap.data();
        const players = room.playerIds || [];
        if (players.includes(getCurrentUserId())) return;
        if (players.length >= (room.maxPlayers || 4)) throw new Error("Room is full.");
        transaction.update(roomRef, {
            playerIds: arrayUnion(getCurrentUserId()),
            slotsFilled: increment(1),
            updatedAt: serverTimestamp()
        });
    });
    const room = state.gameRooms.find((item) => item.id === roomId);
    if (room?.conversationId) {
        await updateDoc(doc(db, "conversations", room.conversationId), {
            memberIds: arrayUnion(getCurrentUserId()),
            updatedAt: serverTimestamp()
        });
    }
    toast("Joined game room.", "success");
}

async function joinTournament(tournamentId) {
    await updateDoc(doc(db, "tournaments", tournamentId), {
        playerIds: arrayUnion(getCurrentUserId()),
        updatedAt: serverTimestamp()
    });
    toast("Tournament joined.", "success");
}

async function joinStudyGroup(groupId) {
    const group = state.studyGroups.find((item) => item.id === groupId);
    if (!group) return;
    await updateDoc(doc(db, "studyGroups", groupId), {
        memberIds: arrayUnion(getCurrentUserId()),
        updatedAt: serverTimestamp()
    });
    await updateDoc(doc(db, "conversations", group.conversationId), {
        memberIds: arrayUnion(getCurrentUserId()),
        updatedAt: serverTimestamp()
    });
    toast("Joined study group.", "success");
}

async function uploadAndSendNotes() {
    els.mediaInput.accept = "image/*,.pdf";
    els.mediaInput.click();
}

function createUpiPayment(planAmount, planName) {
    const payee = "zchat@upi";
    const transaction = `ZCHAT${Date.now()}`;
    const uri = `upi://pay?pa=${encodeURIComponent(payee)}&pn=${encodeURIComponent("Z Chat Premium")}&am=${encodeURIComponent(planAmount)}&cu=INR&tn=${encodeURIComponent(`${planName} ${transaction}`)}`;
    const qr = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(uri)}`;
    return { uri, qr, transaction };
}

function openPremiumModal() {
    state.selectedPlan = null;
    els.paymentPreview.classList.add("hidden");
    els.paymentPreview.innerHTML = "";
    els.markPaymentBtn.classList.add("hidden");
    openModal(els.premiumModal);
}

function renderPaymentPreview(amount, name) {
    const { uri, qr, transaction } = createUpiPayment(amount, name);
    state.selectedPlan = { amount, name, uri, transaction };
    els.paymentPreview.classList.remove("hidden");
    els.paymentPreview.innerHTML = `
        <strong>${sanitize(name)}</strong>
        <p>Pay ₹${amount} using any UPI app. Scan the QR below or open the direct UPI intent.</p>
        <img src="${qr}" alt="UPI QR for ${sanitize(name)}">
        <div class="note-card">
            <strong>UPI ID</strong>
            <small>zchat-premium@fam</small>
        </div>
        <a class="primary-btn" href="${uri}">Open UPI App</a>
        <small>After completing payment, click "I Have Paid" to activate premium on your profile.</small>
    `;
    els.markPaymentBtn.classList.remove("hidden");
}

async function confirmPayment() {
    if (!state.selectedPlan) return;
    await addDoc(collection(db, "payments"), {
        userId: getCurrentUserId(),
        username: state.profile.username,
        amount: state.selectedPlan.amount,
        planName: state.selectedPlan.name,
        transaction: state.selectedPlan.transaction,
        status: "user_marked_paid",
        providers: ["GPay", "FamPay", "PhonePe", "Paytm"],
        createdAt: serverTimestamp()
    });
    await updateDoc(doc(db, "users", getCurrentUserId()), {
        premium: true,
        plan: String(state.selectedPlan.amount),
        premiumPlan: String(state.selectedPlan.amount),
        activatedAt: serverTimestamp(),
        premiumMeta: {
            active: true,
            planName: state.selectedPlan.name,
            amount: String(state.selectedPlan.amount),
            providerFlow: "UPI",
            upiId: "zchat-premium@fam",
            updatedAt: new Date().toISOString()
        },
        premiumBadge: String(state.selectedPlan.amount) === "99",
        updatedAt: serverTimestamp()
    });
    await loadProfile();
    renderEmojiPicker();
    state.selectedPlan = null;
    toast("Premium activated.", "success");
    closeModal(els.premiumModal);
}

async function runAi() {
    if (!ensurePremiumAccess({ plan: "99", message: "Upgrade to Premium 99 to use AI features." })) return;
    const mode = els.aiModeSelect.value;
    const input = els.aiInput.value.trim();
    if (!input) return;
    state.openAiKey = els.openaiKeyInput.value.trim();
    localStorage.setItem("zchat-openai-key", state.openAiKey);

    if (mode === "scan") {
        const scan = await runScanner(input);
        els.aiOutput.textContent = scan;
        return;
    }

    if (!state.openAiKey) {
        els.aiOutput.textContent = "Set an OpenAI API key to enable AI Tutor requests.";
        return;
    }

    const prompts = {
        explain: `Explain this clearly for a student and give a practical example:\n\n${input}`,
        solve: `Solve the following step by step and show the reasoning clearly:\n\n${input}`,
        summarize: `Summarize these notes into crisp bullet points, key definitions, and exam-ready revision notes:\n\n${input}`,
        quiz: `Generate a quiz from the following content with answers at the end:\n\n${input}`
    };

    els.aiOutput.textContent = "Thinking...";
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${state.openAiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are Z Chat AI Tutor. Be accurate, concise, and structured." },
                    { role: "user", content: prompts[mode] }
                ],
                temperature: 0.4
            })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error?.message || "AI request failed.");
        els.aiOutput.textContent = data.choices?.[0]?.message?.content || "No response.";
    } catch (error) {
        els.aiOutput.textContent = error.message;
    }
}

async function runScanner(input) {
    const keywords = input.toLowerCase().replace(/[^\w\s]/g, " ").split(/\s+/).filter((word) => word.length > 4).slice(0, 6);
    const wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(keywords[0] || input.split(" ")[0])}`;
    const ddgUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(keywords.join(" "))}&format=json&no_redirect=1&no_html=1`;
    const [wikiRes, ddgRes] = await Promise.allSettled([fetch(wikiUrl), fetch(ddgUrl)]);
    let score = 0;
    const notes = [];

    if (wikiRes.status === "fulfilled" && wikiRes.value.ok) {
        const wiki = await wikiRes.value.json();
        if (wiki.extract) {
            score += 1;
            notes.push(`Wikipedia hit: ${wiki.extract.slice(0, 280)}...`);
        }
    }
    if (ddgRes.status === "fulfilled" && ddgRes.value.ok) {
        const ddg = await ddgRes.value.json();
        if (ddg.AbstractText || ddg.RelatedTopics?.length) {
            score += 1;
            notes.push(`Web API hit: ${ddg.AbstractText || "Related coverage found."}`);
        }
    }

    const verdict = score >= 2 ? "Likely True ✅" : "Possibly Fake ⚠️";
    return `${verdict}\n\nKeywords: ${keywords.join(", ") || "none"}\n\n${notes.join("\n\n") || "No strong matching references were found. Cross-check before forwarding."}`;
}

async function scanMessageById(messageId) {
    if (!ensurePremiumAccess({ plan: "99", message: "Upgrade to Premium 99 to scan messages with Z Scanner." })) return;
    const message = state.messages.find((item) => item.id === messageId);
    if (!message) return;
    const result = await runScanner(message.text || "");
    const [verdictLine, , ...rest] = result.split("\n");
    await updateDoc(doc(db, "conversations", state.currentConversation, "messages", messageId), {
        scanResult: {
            verdict: verdictLine || "Possibly Fake ⚠️",
            summary: rest.join(" ").trim().slice(0, 400),
            scannedAt: new Date().toISOString()
        }
    });
}

async function saveProfile() {
    const user = auth.currentUser;
    if (!user) return;
    debugLog("Save profile clicked", user.uid);
    const nextUsername = els.profileUsernameInput.value.trim().toLowerCase();
    if (nextUsername && state.profile?.username && nextUsername !== state.profile.username && !ensurePremiumAccess({ plan: "99", message: "Upgrade to Premium 99 to change your username." })) {
        return;
    }
    let nextAvatarUrl = state.profile?.avatarUrl || "";
    const avatarFile = els.profileAvatarInput.files[0];
    if (avatarFile) {
        toast("Uploading avatar...");
        nextAvatarUrl = await uploadFile(`avatars/${user.uid}/${Date.now()}_${avatarFile.name}`, avatarFile);
    }
    await createOrUpdateUserProfile({
        user,
        username: els.profileUsernameInput.value.trim(),
        bio: els.profileBioInput.value.trim(),
        avatarUrl: nextAvatarUrl,
        gameUid: els.gamingUidInput.value.trim(),
        rank: els.gamingRankInput.value.trim(),
        stats: els.gamingStatsInput.value.trim()
    });
    closeModal(els.profileModal);
    toast("Profile updated.", "success");
}

async function renameCurrentGroup() {
    if (!state.currentConversationData || !["group", "study", "gaming"].includes(state.currentConversationData.type)) {
        toast("Open a group-style conversation first.");
        return;
    }
    const nextName = window.prompt("Enter new group name", state.currentConversationData.title || "");
    if (nextName === null) return;
    const title = nextName.trim();
    if (!title) {
        toast("Group name cannot be empty.", "error");
        return;
    }
    await updateDoc(doc(db, "conversations", state.currentConversation), {
        title,
        updatedAt: serverTimestamp()
    });
    const groupCollections = {
        group: "groups",
        study: "studyGroups",
        gaming: "gameRooms"
    };
    const collectionName = groupCollections[state.currentConversationData.type];
    const matching = await getDocs(query(collection(db, collectionName), where("conversationId", "==", state.currentConversation)));
    await Promise.all(matching.docs.map((groupDoc) => updateDoc(groupDoc.ref, {
        name: title,
        title,
        updatedAt: serverTimestamp()
    })));
    toast("Group name updated.", "success");
}

async function handleSearchInput() {
    const search = els.globalSearchInput.value.trim();
    renderConversationList(search);
    renderFriends(search);
    renderGameRooms(search);
    renderTournaments(search);
    renderStudyGroups(search);
}

async function clearNotifications() {
    await Promise.all(state.notifications.map((item) => deleteDoc(doc(db, "notifications", item.id))));
}

async function updatePresence(online) {
    if (!getCurrentUserId()) return;
    await updateDoc(doc(db, "users", getCurrentUserId()), {
        online,
        lastSeen: serverTimestamp(),
        updatedAt: serverTimestamp()
    }).catch(() => {});
}

function wireTyping() {
    els.messageInput.addEventListener("input", async () => {
        els.messageInput.style.height = "auto";
        els.messageInput.style.height = `${Math.min(els.messageInput.scrollHeight, 220)}px`;
        clearTimeout(state.typingDebounce);
        await sendTypingState(true);
        state.typingDebounce = setTimeout(() => sendTypingState(false), 1200);
    });
}

async function submitMessage() {
    try {
        const media = await uploadPendingMedia();
        await sendMessage({ text: els.messageInput.value, media });
    } catch (error) {
        setUploadProgress("", false);
        throw error;
    }
}

async function sendGif() {
    if (!ensurePremiumAccess({ plan: "49", message: "Upgrade to Premium 49 to send unlimited GIFs and media." })) return;
    const url = els.gifUrlInput.value.trim();
    if (!url) return;
    await sendMessage({ media: [{ url, name: "GIF", type: "image/gif", kind: "gif" }], type: "gif" });
    els.gifUrlInput.value = "";
    closeModal(els.gifModal);
}

async function startCall(kind = "voice") {
    debugLog("Start call", kind);
    if (!state.currentConversationData) {
        toast("Open a direct or group conversation first.");
        return;
    }
    if (!ensurePremiumAccess({ plan: "99", message: "Upgrade to Premium to use Calls" })) {
        return;
    }
    const peerId = state.currentConversationData.memberIds.find((id) => id !== getCurrentUserId()) || state.currentConversationData.memberIds[0];
    const callDoc = await addDoc(collection(db, "calls"), {
        conversationId: state.currentConversation,
        callerId: getCurrentUserId(),
        calleeId: peerId,
        kind,
        status: "ringing",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    });
    await openCallUI({ id: callDoc.id, kind, calleeId: peerId, callerId: getCurrentUserId(), status: "ringing" }, true);
    await createNotification(peerId, {
        type: "call",
        title: `${state.profile.username} is calling`,
        body: `${kind} call incoming`
    });
}

async function incomingCall(call) {
    await openCallUI(call, false);
    els.acceptCallBtn.classList.remove("hidden");
    els.rejectCallBtn.classList.remove("hidden");
    els.callStatusText.textContent = `${call.kind} call incoming`;
}

async function openCallUI(callData, isCaller) {
    await cleanupCall(false);
    state.call.id = callData.id;
    state.call.data = callData;
    els.callTitle.textContent = callData.kind === "video" ? "Video Call" : "Voice Call";
    els.callPeerName.textContent = "Connecting...";
    els.callStatusText.textContent = isCaller ? "Dialing..." : "Incoming call";
    els.acceptCallBtn.classList.toggle("hidden", isCaller);
    els.rejectCallBtn.classList.toggle("hidden", isCaller);
    openModal(els.callModal);

    const targetUserId = isCaller ? callData.calleeId : callData.callerId;
    const targetSnap = await getDoc(doc(db, "users", targetUserId));
    els.callPeerName.textContent = targetSnap.exists() ? targetSnap.data().username : "Unknown user";

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: callData.kind === "video" });
    state.call.localStream = stream;
    els.localVideo.srcObject = stream;
    state.call.remoteStream = new MediaStream();
    els.remoteVideo.srcObject = state.call.remoteStream;

    const pc = new RTCPeerConnection(ICE_SERVERS);
    state.call.peerConnection = pc;
    stream.getTracks().forEach((track) => pc.addTrack(track, stream));
    pc.ontrack = (event) => event.streams[0].getTracks().forEach((track) => state.call.remoteStream.addTrack(track));

    const callRef = doc(db, "calls", callData.id);
    const offerCandidates = collection(db, "calls", callData.id, "offerCandidates");
    const answerCandidates = collection(db, "calls", callData.id, "answerCandidates");
    pc.onicecandidate = async (event) => {
        if (!event.candidate) return;
        await addDoc(isCaller ? offerCandidates : answerCandidates, event.candidate.toJSON());
    };

    state.call.unsubscribers.push(onSnapshot(callRef, async (snap) => {
        const data = snap.data();
        if (!data) return;
        state.call.data = { id: snap.id, ...data };
        if (!isCaller && data.offer && !pc.currentRemoteDescription) {
            await pc.setRemoteDescription(data.offer);
        }
        if (isCaller && data.answer && !pc.currentRemoteDescription) {
            await pc.setRemoteDescription(data.answer);
            await updateDoc(callRef, { status: "ongoing", updatedAt: serverTimestamp() });
            beginCallTimer();
        }
        els.callStatusText.textContent = data.status || "Connecting";
        if (data.status === "ended" || data.status === "rejected") {
            cleanupCall();
        }
        if (!isCaller && data.status === "answered" && !state.call.startedAt) beginCallTimer();
    }));

    state.call.unsubscribers.push(onSnapshot(isCaller ? answerCandidates : offerCandidates, async (snap) => {
        for (const change of snap.docChanges()) {
            if (change.type !== "added") continue;
            try {
                await pc.addIceCandidate(change.doc.data());
            } catch {}
        }
    }));

    if (isCaller) {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        await updateDoc(callRef, { offer: { type: offer.type, sdp: offer.sdp }, updatedAt: serverTimestamp() });
    }
}

async function acceptCall() {
    debugLog("Accept incoming call", state.call.id);
    const pc = state.call.peerConnection;
    const callRef = doc(db, "calls", state.call.id);
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    await updateDoc(callRef, {
        answer: { type: answer.type, sdp: answer.sdp },
        status: "answered",
        updatedAt: serverTimestamp()
    });
    beginCallTimer();
    els.acceptCallBtn.classList.add("hidden");
    els.rejectCallBtn.classList.add("hidden");
}

async function rejectCall() {
    debugLog("Reject call", state.call.id);
    if (state.call.id) {
        await updateDoc(doc(db, "calls", state.call.id), { status: "rejected", updatedAt: serverTimestamp() }).catch(() => {});
    }
    await cleanupCall();
}

function beginCallTimer() {
    if (state.call.timer) return;
    state.call.startedAt = Date.now();
    state.call.timer = setInterval(() => {
        const seconds = Math.floor((Date.now() - state.call.startedAt) / 1000);
        const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
        const ss = String(seconds % 60).padStart(2, "0");
        els.callTimer.textContent = `${mm}:${ss}`;
    }, 1000);
}

async function cleanupCall(close = true) {
    debugLog("Cleanup call", state.call.id);
    state.call.unsubscribers.forEach((fn) => fn?.());
    state.call.unsubscribers = [];
    if (state.call.timer) clearInterval(state.call.timer);
    state.call.timer = null;
    state.call.startedAt = null;
    if (state.call.localStream) state.call.localStream.getTracks().forEach((track) => track.stop());
    if (state.call.peerConnection) state.call.peerConnection.close();
    state.call.localStream = null;
    state.call.remoteStream = null;
    state.call.peerConnection = null;
    if (state.call.id) {
        await updateDoc(doc(db, "calls", state.call.id), { status: "ended", updatedAt: serverTimestamp() }).catch(() => {});
    }
    state.call.id = null;
    els.callTimer.textContent = "00:00";
    els.localVideo.srcObject = null;
    els.remoteVideo.srcObject = null;
    if (close) closeModal(els.callModal);
}

function toggleTrack(kind) {
    const tracks = state.call.localStream?.getTracks().filter((track) => track.kind === kind) || [];
    tracks.forEach((track) => {
        track.enabled = !track.enabled;
    });
}

async function joinTeamFinder() {
    if (!ensurePremiumAccess({ plan: "99", message: "Upgrade to Premium 99 to access gaming rooms." })) return;
    const eligible = state.gameRooms.find((room) => room.game && room.playerIds?.length < (room.maxPlayers || 4));
    if (eligible) {
        await joinGameRoom(eligible.id);
        await selectConversation(eligible.conversationId);
        toast("Matched into an active squad room.", "success");
        return;
    }
    launchCreator("room");
}

function bindDelegatedClicks() {
    document.body.addEventListener("click", async (event) => {
        const button = event.target.closest("button");
        if (!button) return;
        debugLog("Button click", button.id || button.dataset.conversationId || button.textContent.trim());
        try {
            if (button.dataset.emoji) {
                els.messageInput.value += button.dataset.emoji;
                closeModal(els.emojiModal);
            }
            if (button.dataset.removeUpload) {
                state.pendingUploads = state.pendingUploads.filter((item) => item.id !== button.dataset.removeUpload);
                renderMediaPreview();
            }
            if (button.dataset.conversationId) {
                await selectConversation(button.dataset.conversationId);
                toggleSidebar(false);
            }
            if (button.dataset.channelConversation) {
                await selectConversation(button.dataset.channelConversation);
                toggleSidebar(false);
            }
            if (button.dataset.acceptRequest) await acceptFriendRequest(button.dataset.acceptRequest);
            if (button.dataset.rejectRequest) await rejectFriendRequest(button.dataset.rejectRequest);
            if (button.dataset.sendRequest) await sendFriendRequest(button.dataset.sendRequest, button.dataset.username);
            if (button.dataset.startDm) {
                const convo = await ensureDirectConversation(button.dataset.startDm);
                await selectConversation(convo);
                toggleSidebar(false);
            }
            if (button.dataset.removeFriend) await removeFriend(button.dataset.removeFriend);
            if (button.dataset.joinRoom) await joinGameRoom(button.dataset.joinRoom);
            if (button.dataset.openRoomChat) await selectConversation(button.dataset.openRoomChat);
            if (button.dataset.joinTournament) await joinTournament(button.dataset.joinTournament);
            if (button.dataset.joinStudy) await joinStudyGroup(button.dataset.joinStudy);
            if (button.dataset.openStudyChat) await selectConversation(button.dataset.openStudyChat);
            if (button.dataset.openSubject) {
                const subject = button.dataset.openSubject;
                let convo = state.allConversations.find((item) => item.type === "study-subject" && item.subject === subject);
                if (!convo) {
                    const ref = await addDoc(collection(db, "conversations"), {
                        type: "study-subject",
                        title: `#${subject}`,
                        subject,
                        description: `${subject} help, doubt solving, and notes`,
                        memberIds: [getCurrentUserId()],
                        updatedAt: serverTimestamp(),
                        createdAt: serverTimestamp(),
                        lastMessagePreview: `#${subject} opened`
                    });
                    convo = { id: ref.id };
                }
                await selectConversation(convo.id);
            }
            if (button.dataset.reply) {
                const message = state.messages.find((item) => item.id === button.dataset.reply);
                state.replyTo = message ? { id: message.id, senderUsername: message.senderUsername, text: message.text || "" } : null;
                renderReplyBanner();
            }
            if (button.dataset.scanMessage) await scanMessageById(button.dataset.scanMessage);
            if (button.dataset.edit) await editMessage(button.dataset.edit);
            if (button.dataset.delete) await deleteMessageAction(button.dataset.delete);
            if (button.dataset.react) await toggleReaction(button.dataset.react, button.dataset.emoji);
            if (button.dataset.cancelReply) {
                state.replyTo = null;
                renderReplyBanner();
            }
            if (button.matches(".plan-card")) {
                debugLog("Select premium plan", button.dataset.plan);
                renderPaymentPreview(button.dataset.plan, button.dataset.name);
            }
            if (button.matches(".theme-card")) {
                setTheme(button.dataset.theme);
                closeModal(els.themeModal);
            }
        } catch (error) {
            reportError("Button action failed", error);
        }
    });
}

function bindEvents() {
    window.addEventListener("error", (event) => reportError("Runtime error", event.error || event.message));
    window.addEventListener("unhandledrejection", (event) => reportError("Unhandled promise", event.reason));
    els.showSigninBtn.addEventListener("click", () => setAuthMode("signin"));
    els.showSignupBtn.addEventListener("click", () => setAuthMode("signup"));
    els.signinForm.addEventListener("submit", signInWithEmail);
    els.signupForm.addEventListener("submit", signUpWithEmail);
    els.googleSigninBtn.addEventListener("click", () => signInWithGoogle("signin"));
    els.googleSignupBtn.addEventListener("click", () => signInWithGoogle("signup"));
    els.forgotPasswordBtn.addEventListener("click", resetPassword);
    document.querySelectorAll(".nav-btn").forEach((btn) => btn.addEventListener("click", () => setSection(btn.dataset.section)));
    els.mobileOpenSidebar.addEventListener("click", () => toggleSidebar(true));
    els.mobileCloseSidebar.addEventListener("click", () => toggleSidebar(false));
    els.drawerOverlay.addEventListener("click", () => toggleSidebar(false));
    els.mediaBtn.addEventListener("click", () => els.mediaInput.click());
    els.mediaInput.addEventListener("change", (event) => {
        attachPendingMedia(event.target.files);
        event.target.value = "";
    });
    els.sendMessageBtn.addEventListener("click", () => submitMessage().catch((error) => toast(error.message, "error")));
    els.messageInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            submitMessage().catch((error) => toast(error.message, "error"));
        }
    });
    els.loadMoreBtn.addEventListener("click", loadOlderMessages);
    els.openProfileBtn.addEventListener("click", () => openModal(els.profileModal));
    $("profile-card").addEventListener("click", (event) => {
        if (event.target.closest("#mobile-close-sidebar")) return;
        openModal(els.profileModal);
    });
    els.editProfileBtn.addEventListener("click", () => openModal(els.profileModal));
    els.saveProfileBtn.addEventListener("click", () => saveProfile().catch((error) => toast(error.message, "error")));
    els.renameGroupBtn.addEventListener("click", () => renameCurrentGroup().catch((error) => toast(error.message, "error")));
    els.openUserSearchBtn.addEventListener("click", () => openModal(els.userSearchModal));
    els.userSearchInput.addEventListener("input", () => startUserSearch().catch((error) => toast(error.message, "error")));
    els.newDirectChatBtn.addEventListener("click", () => openModal(els.userSearchModal));
    els.newGroupBtn.addEventListener("click", () => launchCreator("group"));
    els.newServerBtn.addEventListener("click", () => launchCreator("server"));
    els.createRoomBtn.addEventListener("click", () => launchCreator("room"));
    els.createTournamentBtn.addEventListener("click", () => launchCreator("tournament"));
    els.createStudyGroupBtn.addEventListener("click", () => launchCreator("study"));
    els.creatorSubmitBtn.addEventListener("click", () => submitCreator().catch((error) => toast(error.message, "error")));
    els.premiumBtn.addEventListener("click", () => openPremiumModal());
    els.markPaymentBtn.addEventListener("click", () => confirmPayment().catch((error) => toast(error.message, "error")));
    els.aiPanelBtn.addEventListener("click", () => openModal(els.aiModal));
    els.openTutorBtn.addEventListener("click", () => openModal(els.aiModal));
    els.scannerBtn.addEventListener("click", () => {
        els.aiModeSelect.value = "scan";
        openModal(els.aiModal);
    });
    els.runAiBtn.addEventListener("click", () => runAi().catch((error) => toast(error.message, "error")));
    els.themeBtn.addEventListener("click", () => openModal(els.themeModal));
    els.emojiBtn.addEventListener("click", () => openModal(els.emojiModal));
    els.gifBtn.addEventListener("click", () => openModal(els.gifModal));
    els.sendGifBtn.addEventListener("click", () => sendGif().catch((error) => toast(error.message, "error")));
    els.voiceCallBtn.addEventListener("click", () => startCall("voice").catch((error) => toast(error.message, "error")));
    els.videoCallBtn.addEventListener("click", () => startCall("video").catch((error) => toast(error.message, "error")));
    els.acceptCallBtn.addEventListener("click", () => acceptCall().catch((error) => toast(error.message, "error")));
    els.rejectCallBtn.addEventListener("click", () => rejectCall().catch((error) => toast(error.message, "error")));
    els.endCallBtn.addEventListener("click", () => cleanupCall().catch((error) => toast(error.message, "error")));
    els.closeCallBtn.addEventListener("click", () => cleanupCall().catch((error) => toast(error.message, "error")));
    els.toggleMicBtn.addEventListener("click", () => toggleTrack("audio"));
    els.toggleCameraBtn.addEventListener("click", () => toggleTrack("video"));
    els.openCallRoomBtn.addEventListener("click", () => joinTeamFinder().catch((error) => toast(error.message, "error")));
    els.joinTeamFinderBtn.addEventListener("click", () => joinTeamFinder().catch((error) => toast(error.message, "error")));
    els.openStudyNotesBtn.addEventListener("click", uploadAndSendNotes);
    els.notificationsBtn.addEventListener("click", () => {
        els.notificationList.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    els.clearNotificationsBtn.addEventListener("click", () => clearNotifications().catch((error) => toast(error.message, "error")));
    els.globalSearchInput.addEventListener("input", () => handleSearchInput().catch((error) => toast(error.message, "error")));
    els.logoutBtn.addEventListener("click", async () => {
        await updatePresence(false);
        await signOut(auth);
        toast("Logged out.");
    });
    window.addEventListener("beforeunload", () => updatePresence(false));
    document.addEventListener("visibilitychange", () => updatePresence(!document.hidden));
    bindDelegatedClicks();
    wireTyping();
}

async function bootstrapApp(user) {
    state.user = user;
    setTheme(state.theme, { skipGate: true });
    renderEmojiPicker();
    els.openaiKeyInput.value = state.openAiKey;
    await loadProfile();
    const requiredPlan = THEME_REQUIREMENTS[state.theme] || "free";
    if (requiredPlan !== "free" && !hasPremiumTier(requiredPlan)) {
        setTheme("cyber-blue", { skipGate: true });
    } else {
        setTheme(state.theme, { skipGate: true });
    }
    renderEmojiPicker();
    subscribeBaseData();
    renderMetrics();
    renderOverview(null);
}

onAuthStateChanged(auth, async (user) => {
    if (!user) {
        state.user = null;
        state.profile = null;
        clearRealtime();
        els.authView.classList.remove("hidden");
        els.appView.classList.add("hidden");
        return;
    }
    els.authView.classList.add("hidden");
    els.appView.classList.remove("hidden");
    try {
        await bootstrapApp(user);
        await updatePresence(true);
    } catch (error) {
        toast(error.message, "error");
    }
});

bindEvents();
auditButtons();
setAuthMode("signin");
setTheme(state.theme, { skipGate: true });
