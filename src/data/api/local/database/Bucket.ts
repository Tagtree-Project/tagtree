export abstract class Bucket {
  abstract path: string

  getFileByName = async (name: string) => {
    return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${this.path}/${name}`).then(res => res.text());
  }
}