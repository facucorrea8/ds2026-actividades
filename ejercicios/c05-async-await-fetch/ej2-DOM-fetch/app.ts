interface Usuario {
    id: number;
    name: string;
    email: string;
}

const listElement = document.getElementById('user-list') as HTMLUListElement;
const loadingElement = document.getElementById('loading') as HTMLParagraphElement;
const errorElement = document.getElementById('error-message') as HTMLParagraphElement;

async function renderUsuarios(): Promise<void> {
    try {
        loadingElement.style.display = 'block';
        errorElement.style.display = 'none';

        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) throw new Error("No se pudieron obtener los datos.");

        const usuarios: Usuario[] = await response.json();

        usuarios.forEach(user => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${user.name}</strong> - ${user.email}`;
            listElement.appendChild(li);
        });

    } catch (error) {
        errorElement.innerText = "Error: " + (error as Error).message;
        errorElement.style.display = 'block';
    } finally {
        loadingElement.style.display = 'none';
    }
}

renderUsuarios();