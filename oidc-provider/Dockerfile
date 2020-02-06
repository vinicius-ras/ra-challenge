FROM mcr.microsoft.com/dotnet/core/sdk:3.1
WORKDIR /workspace/oidc-provider/
COPY oidc-provider.csproj oidc-provider.csproj
RUN dotnet restore
COPY . .
CMD dotnet run --project .