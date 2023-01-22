export default {
  dev: {
    id: "00000",
    regions: {
      "eu-west-1": {
        secret: "aaa",
      },
    },
  },
  stage: {
    id: "11111",
    regions: {
      "eu-central-1": {
        secret: "bbb",
      },
      "us-east-2": {
        secret: "ccc",
      },
      "ap-northeast-1": {
        secret: "ddd",
      },
    },
  },
  prod: {
    id: "22222",
    regions: {
      "eu-central-1": {
        secret: "eee",
      },
      "us-east-2": {
        secret: "fff",
      },
      "ap-northeast-1": {
        secret: "ggg",
      },
    },
  },
};
