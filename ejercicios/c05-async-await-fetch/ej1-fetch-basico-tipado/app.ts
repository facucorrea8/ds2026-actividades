interface Usuario {
  id: number;
  name: string;
  email: string;
  phone: string;
}

async function obtenerUsuarios(): Promise<Usuario[]> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }

    const usuarios: Usuario[] = await response.json();
    return usuarios;
    
  } catch (error) {
    console.error("Hubo un problema al obtener los usuarios:", error);
    return [];
  }
}

async function mostrarDatos() {
  const listaUsuarios = await obtenerUsuarios();

  listaUsuarios.forEach(usuario => {
    console.log(`Nombre: ${usuario.name} | Email: ${usuario.email}`);
  });
}

mostrarDatos();