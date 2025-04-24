package com.example.demo.Services;


import com.example.demo.Model.Post;
import com.example.demo.Repo.PostRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostRepo postrepo;

    public List<Post> getallpost() {
        return postrepo.findAll();
    }

    public  Post createpost(Post post){
       return  postrepo.save(post);
    }

    public  Post updatepost(int id,Post info){
         return postrepo.save(info);
    }

    public Boolean deletepost(int id){
        postrepo.deleteById(id);
        return true;
    }

}
