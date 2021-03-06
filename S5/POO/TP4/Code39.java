import java.util.*;
import java.awt.Graphics;

class Code39{
  static HashMap<Character,String> map = new HashMap<Character,String>(43);

  static{
    map.put('A', "100001001");
    map.put('B', "001001001");
    map.put('C', "101001000");
    map.put('D', "000011001");
    map.put('E', "100011000");
    map.put('F', "001011000");
    map.put('G', "000001101");
    map.put('H', "100001100");
    map.put('I', "001001100");
    map.put('J', "000011100");
    map.put('K', "100000011");
    map.put('L', "001000011");
    map.put('M', "101000010");
    map.put('N', "000010011");
    map.put('O', "100010010");
    map.put('P', "001010010");
    map.put('Q', "000000111");
    map.put('R', "100000110");
    map.put('S', "001000110");
    map.put('T', "000010110");
    map.put('U', "110000001");
    map.put('V', "011000001");
    map.put('W', "111000000");
    map.put('w', "111000000");
    map.put('X', "010010001");
    map.put('Y', "110010000");
    map.put('Z', "011010000");
    map.put('0', "000110100");
    map.put('1', "100100001");
    map.put('2', "001100001");
    map.put('3', "101100000");
    map.put('4', "000110001");
    map.put('5', "100110000");
    map.put('6', "001110000");
    map.put('7', "000100101");
    map.put('8', "100100100");
    map.put('9', "001100100");
    map.put(' ', "011000100");
    map.put('-', "010000101");
    map.put('$', "010101000");
    map.put('%', "000101010");
    map.put('.', "110000100");
    map.put('/', "010101010");
    map.put('/', "010100010");
    map.put('+', "010001010");
    map.put('*', "010010100");
  }

  public String getCode(char c){
    return map.get(Character.toUpperCase(c));
  }

  public String getCode(String s){
    String res=this.getCode('*');
    for(int i=0;i<s.length();i++){
      res+="0" + this.getCode(Character.toUpperCase(s.charAt(i)));
    }
    res+="0" + this.getCode('*');
    return res;
  }
}
