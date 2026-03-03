# OAuth 2.0 and PKCE Frontend Security in Kubernetes

This project demonstrates the implementation of **OAuth 2.0** authorization with the **PKCE** (Proof Key for Code Exchange) extension in a **React** frontend application, utilizing **Keycloak** as the Identity Provider (IdP).

## Project Objectives

The goal is to secure a frontend application using the OAuth 2.0 standard while meeting the following criteria:

- **Functional Integration**: A React frontend communicating effectively with Keycloak.
- **Kubernetes Readiness**: All components (Frontend and Keycloak) operate as separate deployments within a Kubernetes cluster, with configurations managed via ConfigMaps.
- **Robust Security**: Application access requires authentication, JWT tokens are verified on the client side, and logout actions invalidate sessions.
- **Role-Based Access Control (RBAC)**: A dedicated Admin Panel (`/admin`) is restricted solely to users with the "admin" role.

## Technologies Used

- **Frontend**: React (Vite-based).
- **Identity Provider**: Keycloak v22.0.5.
- **Authentication Library**: `oidc-client-ts`.
- **Infrastructure**: Kubernetes (K8s), Docker.
- **Server**: Nginx (serving the frontend build).

## Authorization Flow

The security mechanism follows a modern OAuth 2.0 PKCE flow:

1. **Application Access**: The app checks the authentication state via `AuthContext`. Unauthenticated users are presented with a login option.
2. **Login Initiation**: Clicking the login button invokes `login()` from `AuthContext`, redirecting the user to Keycloak with a generated `code_challenge` (PKCE).
3. **Authentication**: The user authenticates directly on the Keycloak server.
4. **Authorization Code Redirect**: Upon success, Keycloak redirects the user back to the application with an authorization code.
5. **Token Exchange**: The application exchanges the code for ID and Access tokens, verifying the `code_verifier` (PKCE mechanism). The decoded ID token provides user info and roles.
6. **Resource Access**: Logged-in users access the main panel. Users with the "admin" role can access the protected Admin Panel; others are redirected.
7. **Logout**: The logout button triggers session termination in both Keycloak and the local application.

## System Requirements

- Docker Desktop
- DockerHub account
- Node.js v16+
- kubectl

## Getting Started

### 1. Build and Publish Frontend Image

Navigate to the frontend directory, build the image, and push it to your DockerHub repository:

```bash
cd frontend
docker build -t your-dockerhub-username/my-frontend-image:latest .
docker push your-dockerhub-username/my-frontend-image:latest
cd ..

```

### 2. Update Kubernetes Manifests

In `k8s/frontend-deployment.yaml`, update the image field with your DockerHub login:

```yaml
containers:
      - name: frontend
        image: your-dockerhub-username/my-frontend-image:latest
```

### 3. Deploy to Kubernetes

Apply all manifests in the `k8s/` directory:

```bash
kubectl apply -f k8s/

```

### 4. Verify Deployment

Wait for all pods to reach the `Running` state (approximately 1-2 minutes):

```bash
kubectl get pods --watch

```

### 5. Keycloak Configuration

You may need to manually create the realm and import the configuration using `keycloak/realm-config.json`.

## Testing the Application

### Access Points

- **Application URL**: [http://localhost/](https://www.google.com/search?q=http://localhost/)
- **Keycloak Admin Console**: [http://localhost:8080/admin](https://www.google.com/search?q=http://localhost:8080/admin) (Credentials: `admin`/`admin`)

### Test Credentials

| Username   | Password | Roles       |
| ---------- | -------- | ----------- |
| **admin1** | `admin1` | admin, user |
| **user1**  | `pass1`  | user        |
