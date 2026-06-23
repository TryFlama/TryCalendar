# TryCalendar

Calendario interactivo con soporte para notas diarias y autenticación de usuarios. Creado con **HTML, CSS y JavaScript vanilla**.

## Captura
https://i.ibb.co/7J6FBC3s/Captura-desde-2026-06-23-02-06-51.png


## Funcionalidades

- **Vista mensual** — Navegación entre meses con botones ◀/▶ o flechas del teclado
- **Notas por día** — Haz clic en cualquier día para escribir/editar una nota. Las notas tienen un indicador visual (punto rojo)
- **Día actual** — Resaltado con borde rojo
- **Autenticación** — Sistema de login/registro mediante ventana emergente, con persistencia de sesión vía JWT en localStorage
- **Persistencia local** — Las notas se guardan en `localStorage` (clave `trycalendar_notes`)
- **Responsive** — Diseño adaptable a pantallas pequeñas (≤600px)
- **Animaciones** — Transiciones suaves en hover, apertura del panel de notas y aparición de días
- **Tema oscuro** — Paleta oscura con acento rojo estilo Netflix

## Archivos

| Archivo     | Descripción                                      |
|-------------|--------------------------------------------------|
| `index.html`| Página principal del calendario                  |
| `style.css` | Estilos completos (layout, tema, responsive)      |
| `app.js`    | Lógica del calendario, notas, navegación y auth  |
| `auth.html` | Página de inicio de sesión y registro            |

## Cómo usar

1. Abre `index.html` en un navegador (no requiere servidor).
2. Navega entre meses con los botones o las flechas del teclado (← / →).
3. Haz clic en un día para abrir el panel de notas y escribir un recordatorio.
4. Presiona **Guardar** o presiona `Esc` para cerrar el panel.
5. Haz clic en **Iniciar Sesión** para abrir el modal de autenticación. Una vez autenticado, el botón muestra tu nombre de usuario. Vuelve a hacer clic para cerrar sesión.

## API de autenticación

El login/registro se realiza contra:

```
POST https://backendauth-qxg5.onrender.com/api/login
POST https://backendauth-qxg5.onrender.com/api/register
```

Cuerpo: `{ "username": "...", "password": "..." }`

Respuesta exitosa (login):
```json
{ "success": true, "token": "jwt...", "username": "user" }
```

El token y usuario se almacenan en `localStorage` con las claves `trycalendar_jwt` y `trycalendar_user`.

## Atajos de teclado

| Tecla        | Acción                   |
|-------------|--------------------------|
| ←           | Mes anterior             |
| →           | Mes siguiente            |
| Escape      | Cerrar panel de notas    |

## Personalización

Las variables CSS en `:root` permiten cambiar colores fácilmente:

```css
--bg: #0f0f0f;
--surface: #1a1a2e;
--accent: #e50914;
--text: #ffffff;
```

## Licencia

Uso personal. Hecho por **TryFlama** para **TryAuth**.
