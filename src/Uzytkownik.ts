export class Uzytkownik {
    private static users: Uzytkownik[] = [];

    constructor(public id: number, public name: string, public imie: string, public nazwisko: string, public email: string) {
        Uzytkownik.users.push(this);
    }

    static getNameFromID(id: number): string | undefined {
        const user = Uzytkownik.users.find(u => u.id === id);
        return user ? user.name : undefined;
    }
}