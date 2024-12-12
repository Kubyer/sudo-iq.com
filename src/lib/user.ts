export function getUserId(): string {
    const storageKey = 'sudo_iq_user_id';
    let userId = localStorage.getItem(storageKey);
    
    // If no userId exists, create one
    if (!userId) {
        userId = crypto.randomUUID();
        localStorage.setItem(storageKey, userId);
    }
    console.log("from user.ts", userId);
    return userId;
} 