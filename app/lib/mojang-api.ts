type MojangResponse = {
  id: string;
  name: string;
  properties: Array<{
    name: string;
    value: string;
    signature?: string;
  }>;
};

type PlayerSkin = {
  url?: string;
  model?: "slim";
};

type PlayerCape = {
  url?: string;
};

type PlayerProfile = {
  uuid: string;
  username: string;
  skin: PlayerSkin;
  cape: PlayerCape;
};

export type MojangPlayer = {
  uuid: string;
  username: string;
  skin: {
    url?: string;
    model?: string;
  };
  cape: {
    url?: string;
  };
};

export async function getMojangPlayer(uuid: string): Promise<PlayerProfile> {
  const response: MojangResponse = await fetch(
    `https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`
  ).then((response) => response.json());

  const textures = response.properties.find(
    (prop) => prop.name === "textures"
  )?.value;

  const decodedTextures = textures
    ? JSON.parse(Buffer.from(textures, "base64").toString("utf-8"))
    : null;

  return {
    uuid: response.id,
    username: response.name,
    skin: {
      url: decodedTextures?.textures?.SKIN?.url,
      model: decodedTextures?.textures?.SKIN?.metadata?.model,
    },
    cape: {
      url: decodedTextures?.textures?.CAPE?.url,
    },
  };
}
