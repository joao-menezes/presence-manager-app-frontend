export const normalizeText = (text: string) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const filterUsers = (users: any[], query: string) => {
    if (!query) {
        return users;
    }

    const normalizedQuery = normalizeText(query.toLowerCase());

    return users.filter((user) => {
        const normalizedUsername = normalizeText(user.username.toLowerCase());
        const matchesUsername = normalizedUsername.includes(normalizedQuery);
        const matchesAge = user.age.toString().includes(query);
        return matchesUsername || matchesAge;
    });
};
