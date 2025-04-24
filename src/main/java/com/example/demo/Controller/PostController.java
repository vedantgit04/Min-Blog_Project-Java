package com.example.demo.Controller;


import com.example.demo.Model.Post;
import com.example.demo.Services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api")
public class PostController {

    @Autowired
    private PostService postservice;

    @GetMapping("/posts")
    public List<Post> getallpost(){
       return postservice.getallpost();
    }

    @PostMapping("/create")
    public  String createpost(@RequestBody Post post){
        Post postr = postservice.createpost(post);
        if(postr !=null){
            return "Post Is Created";
        }
        else{
            return "Post is not Created";
        }
    }

    @PutMapping("/update/{id}")
    public  String upadatepost(@PathVariable int id,@RequestBody Post info){
        Post post = postservice.updatepost(id, info);

        if(post !=null){
            return "Post is Updated";
        }
        else{
            return  "Post is not Updated";
        }
    }

    @DeleteMapping("delete/{id}")
    public  String deletepost(@PathVariable int id){
        Boolean flag = postservice.deletepost(id);
        if(flag){
            return "Post is Deleted";
        }
        else{
            return "Post is Not Deleted";
        }
    }



}
