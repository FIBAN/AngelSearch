export class Utils {

  static parseLinkedInId(input: string): string {
    const urlMatch = input.match(/\/in\/([^/?]*)\/?/); //check if input is a linkedIn profile url
    const idMatch = input.match(/^([^/]*)$/); //otherwise check if input looks like a linkedIn id string
    return (urlMatch && urlMatch[1]) || (idMatch && idMatch[1]) || "";
  }

}
