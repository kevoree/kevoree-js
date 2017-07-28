function btoa(binary: string) {
  return new Buffer(binary).toString('base64');
}

export = btoa;
