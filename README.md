# Projekt zabezpieczenia FE z OAuth 2.0 i PKCE w Kubernetes

Projekt demonstruje implementację autoryzacji OAuth 2.0 z rozszerzeniem PKCE w aplikacji frontendowej React, używając Keycloak jako dostawcy tożsamości (IdP).

## Cel projektu

Zabezpieczenie FE przy użyciu standardu OAuth 2.0 z uwzględnieniem następujących kryteriów:

### Spełnienie wymagań projektu

✅ Projekt (FE, IdP) działa

- Frontend w React komunikuje się z Keycloak jako IdP

- Użytkownicy mogą się logować/wylogowywać

- Dane użytkowników są poprawnie wyświetlane

✅ Projekt działa w Kubernetes

- Wszystkie komponenty działają w klastrze Kubernetes

- Frontend i Keycloak są wdrażane jako osobne deploymenty

- Konfiguracja Keycloak jest zarządzana przez ConfigMap

✅ FE jest zabezpieczony

- Dostęp do aplikacji wymaga uwierzytelnienia

- Tokeny JWT są weryfikowane po stronie klienta

- Wylogowanie powoduje unieważnienie sesji

✅ FE ma oddzielny panel admina

- Panel administratora (/admin) jest dostępny tylko dla użytkowników z rolą admin

## Flow autoryzacji

### Użytkownik odwiedza aplikację

- Aplikacja sprawdza stan uwierzytelnienia za pomocą kontekstu AuthContext

- Niezalogowani użytkownicy widzą przycisk logowania

### Logowanie (LoginButton)

- Kliknięcie przycisku wywołuje metodę login() z AuthContext

- Aplikacja przekierowuje do Keycloak z wygenerowanym code_challenge (PKCE)

### Keycloak uwierzytelnia użytkownika

- Użytkownik loguje się w Keycloak

- Po sukcesie Keycloak przekierowuje z powrotem do aplikacji z kodem autoryzacyjnym

### Wymiana kodu na token (AuthContext)

- Aplikacja wymienia kod autoryzacyjny na tokeny ID/access

- Weryfikacja code_verifier (mechanizm PKCE)

- Dekodowany token ID zawiera informacje o użytkowniku i rolach

### Dostęp do zasobów

- Zalogowani użytkownicy widzą panel główny z informacjami

- Użytkownicy z rolą admin widzą link do panelu administracyjnego

### Panel administratora

- Dostęp tylko dla użytkowników z rolą admin

- Inni użytkownicy są przekierowywani do panelu głównego

### Wylogowanie (LogoutButton)

- Wywołanie metody logout() z AuthContext

- Usunięcie sesji w Keycloak i aplikacji

## Wymagania systemowe

- Docker Desktop

- DockerHub

- Node.js v16+

- kubectl

# Uruchomienie projektu krok po kroku

## 1. Sklonuj repozytorium

## 2. Zbuduj i opublikuj obraz Dockera dla FE

cd frontend

docker build -t twoj-dockerhub-uzytkownik/my-frontend-image:latest .

docker push twoj-dockerhub-uzytkownik/my-frontend-image:latest

cd ..

## 3. W pliku frontend-deployment.yaml trzeba w nazwie obrazu zmienic login na swój

        containers:
                        - name: frontend
                          image: wheezybatom/my-frontend-image:latest

## 4. Wdróż aplikację w Kubernetes

kubectl apply -f k8s/

## 5. Sprawdź status wdrożenia

kubectl get pods --watch

Czekaj aż wszystkie pody będą w stanie Running (może to zająć 1-2 minuty).

## 6. Może być konieczne załadowanie realma do keycloaka

W tym celu należy stworzyć nowy realm i załadować plik keycloak/realm-config.json

## Testowanie aplikacji

Dane testowe

### Strona aplikacji

http://localhost/

### Użytkownik - admin

Hasło - admin1

Rola - admin1

### Użytkownik - user1

Hasło - pass1

Rola - user

### Strona keycloak

http://localhost:8080/admin

### Użytkownik - admin

Hasło - admin
